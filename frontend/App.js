import React, { useEffect, useState } from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

import * as Google from 'expo-google-app-auth'
import axios from 'axios'

// Redux
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import userReducer from './store/reducers/userReducer'

import Navigator from './navigators/MainNavigator'
import SignInScreen from './screens/account/SignInScreen'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain
const AUTH_TOKEN_KEY = 'authtoken'
const AUTH_USER_ID = 'uid'

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
            const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
            const userId = await SecureStore.getItemAsync(AUTH_USER_ID)
            if (!token || !userId) throw "Incomplete stored keys"

            const requestBody = {token: token}
            const authResult = await axios.post(`${API_SERVER_DOMAIN}/auth/token`, requestBody)
            const user = authResult.data.user
            setUserData(user)
        } catch (error) {
            // Clear stored token in Secure Store
            await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY, {})
            await SecureStore.deleteItemAsync(AUTH_USER_ID, {})
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
                await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token)
                await SecureStore.setItemAsync(AUTH_USER_ID, user._id)
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
