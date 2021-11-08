import React, { useEffect, useState } from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'

import * as Google from 'expo-google-app-auth'

import Navigator from './navigators/MainNavigator'
import SignInScreen from './screens/account/SignInScreen'
import axios from 'axios'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

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
                setUserData(googleResult.user)
                const authResult = await axios.post(`${API_SERVER_DOMAIN}/account/auth`, googleResult)
                console.log(authResult.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* TODO: Remove bypass */}
            { false ? <Navigator /> : <SignInScreen onSignIn={signInWithGoogleAsync} /> }
        </>
    )
}