import React, { useEffect, useState } from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

import * as Google from 'expo-google-app-auth'
import axios from 'axios'

import userReducer from './store/reducers/userReducer'
import { AUTH_TOKEN_KEY, AUTH_USER_ID, clearAuthAsset, getAuthAsset, setAuthAsset } from './modules/auth'

import Navigator from './navigators/MainNavigator'
import SignInScreen from './screens/account/SignInScreen'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

// Disable Yellow box warning
LogBox.ignoreLogs(['AsyncStorage'])

export default function App() {
    const [userData, setUserData] = useState(null)

    const rootReducer = combineReducers({
        user: userReducer
    })

    const store = createStore(rootReducer)

    useEffect(async () => {
        try {
            // Get authentication token from Secure Store
            const { token, userId } = await getAuthAsset()
            if (!token || !userId) throw "Incomplete stored keys"

            const requestBody = {token: token}
            const authResult = await axios.post(`${API_SERVER_DOMAIN}/auth/token`, requestBody)
            const user = authResult.data.user
            setUserData(user)
        } catch (error) {
            // Clear stored token in Secure Store
            await clearAuthAsset()
        }
    }, [])

    const signInWithGoogleAsync = async () => {
        try {
            const googleResult = await Google.logInAsync({
                iosClientId: Constants.manifest.extra.iosClientId,
                scopes: ['profile', 'email']
            })
            if (googleResult.type === 'success') {
                const authResult = await axios.post(`${API_SERVER_DOMAIN}/auth`, googleResult)
                const user = authResult.data.user
                setUserData(user)

                const token = authResult.data.token
                await setAuthAsset(token, user._id)
            }
        } catch (error) {
            console.log('Authentication Error')
        }
    }

    return (
        <>
            {userData ? <Provider store={store}><Navigator /></Provider> : <SignInScreen onSignIn={signInWithGoogleAsync} />}
        </>
    )
}
