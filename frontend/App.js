import React, { useEffect, useState } from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

import * as Google from 'expo-google-app-auth'

import Navigator from './navigators/MainNavigator'
import SignInScreen from './screens/account/SignInScreen'
import axios from 'axios'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain
const AUTH_TOKEN_KEY = 'authtoken'

// Disable Yellow box warning
LogBox.ignoreLogs(['AsyncStorage'])

export default function App() {

    const [userData, setUserData] = useState(null)

    const signInWithGoogleAsync = async () => {
        try {
            const googleResult = await Google.logInAsync({
                iosClientId: Constants.manifest.extra.iosClientId,
                scopes: ['profile', 'email']
            })
            if (googleResult.type === 'success') {
                const authResult = await axios.post(`${API_SERVER_DOMAIN}/account/auth`, googleResult)
                const user = authResult.data.user
                setUserData(user)

                // await SecureStore.setItemAsync(AUTH_TOKEN_KEY, )
            }
        } catch (error) {
            console.log("Authentication Error")
        }
    }

    return (
        <>
            { userData ? <Navigator /> : <SignInScreen onSignIn={signInWithGoogleAsync} /> }
        </>
    )
}