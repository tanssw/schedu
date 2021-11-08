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
            const result = await Google.logInAsync({
                iosClientId: Constants.manifest.extra.iosClientId,
                scopes: ['profile', 'email']
            })
            if (result.type === 'success') {
                setUserData(result.user)
                const user = await axios.post(`${API_SERVER_DOMAIN}/user/auth`, result.user)
                console.log(user)
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