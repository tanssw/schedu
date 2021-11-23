import React from 'react'
import { LogBox, SafeAreaView, StyleSheet } from 'react-native'

import AuthNavigator from './navigators/AuthNavigator'
import { colorCode } from './styles'

// Disable Yellow box warning
LogBox.ignoreLogs(['AsyncStorage'])

export default function App() {
    return (
        <>
            <SafeAreaView style={styles.safeArea} />
                <AuthNavigator />
        </>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colorCode.blue
    }
})