import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { firebaseConfig } from './config/firebase'

import Navigator from './navigators/MainNavigator'
import SignInScreen from './screens/account/SignInScreen'

initializeApp(firebaseConfig)
const auth = getAuth()

export default function App() {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            user ? setUserData(user) : setUserData(null)
        })
    })

    return (
        <>
            { userData ? <Navigator /> : <SignInScreen onPressSignIn={_signIn} /> }
        </>
    )
}