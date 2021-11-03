import React, { useEffect, useState } from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'

import * as Google from 'expo-google-app-auth'
// import { initializeApp } from 'firebase/app'
// import { getAuth, onAuthStateChanged, signInWithCredential, signInWithCustomToken, GoogleAuthProvider } from 'firebase/auth'
// import { firebaseConfig } from './config/firebase'

import Navigator from './navigators/MainNavigator'
import SignInScreen from './screens/account/SignInScreen'

// initializeApp(firebaseConfig)
// const auth = getAuth()

// Disable Yellow box warning
LogBox.ignoreLogs(['AsyncStorage'])

export default function App() {

    const [userData, setUserData] = useState(null)

    // useEffect(() => {
    //     onAuthStateChanged(auth, user => {
    //         console.log(user)
    //         user ? setUserData(user) : setUserData(null)
    //     })
    // })

    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: Constants.manifest.extra.iosClientId,
                scopes: ['profile', 'email']
            })
            if (result.type === 'success') {
                setUserData(result.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            { true ? <Navigator /> : <SignInScreen onSignIn={signInWithGoogleAsync} /> }
        </>
    )
}