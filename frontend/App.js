import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Navigator from './navigators/MainNavigator'

import SignInScreen from './screens/account/SignInScreen'

const isAuth = () => {
    return false
}

export default function App() {
    return (
        <>
            { isAuth() ? <Navigator /> : <SignInScreen /> }
        </>
    )
}