import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Google from 'expo-google-app-auth'
import Constants from 'expo-constants'

import { background, text } from '../../styles'

const signInWithGoogleAsync = async () => {
    try {
        const result = await Google.logInAsync({
            iosClientId: Constants.manifest.extra.iosClientId,
            scopes: ['profile', 'email']
        })

        if (result.type === 'success') {
            return result.accessToken
        } else {
            return { cancelled: true }
        }
    } catch (error) {
        return { error: true }
    }

}

export default function SignInScreen() {
    return (
        <View style={[styles.container, background.blue]}>
            <View style={styles.appTitleContainer}>
                <Text style={[styles.appTitle, text.lighterBlue]}>Sch</Text>
                <Text style={styles.appTitle}>edu</Text>
            </View>
            <TouchableOpacity onPress={signInWithGoogleAsync} style={styles.buttonSignIn}>
                <Text style={[styles.textSignIn ,text.lightBlue]}>Sign in with ITKMITL Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },
    appTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 64,
        fontWeight: '200',
        color: 'white'
    },
    buttonSignIn: {
        backgroundColor: 'white',
        width: '100%',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    textSignIn: {
        fontSize: 16
    }
})