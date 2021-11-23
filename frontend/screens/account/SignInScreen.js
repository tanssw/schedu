import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Constants from 'expo-constants'

import * as Google from 'expo-google-app-auth'
import axios from 'axios'

import { clearAuthAsset, getAuthAsset, setAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import { background, text } from '../../styles'

export default function SignInScreen({ navigation }) {

    useEffect(async () => {
        try {
            // Get authentication token from Secure Store
            const { token, userId } = await getAuthAsset()
            if (!token || !userId) throw "Incomplete stored keys"

            const requestBody = {token: token}
            const authResult = await axios.post(`${API_SERVER_DOMAIN}/auth/token`, requestBody)
            const user = authResult.data.user
            redirectToMainScreen()
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

                const token = authResult.data.token
                await setAuthAsset(token, user._id)
                redirectToMainScreen()
            }
        } catch (error) {
            // TODO: Better handle auth error
            console.log('Authentication Error')
        }
    }

    const redirectToMainScreen = () => {
        navigation.navigate('MainNavigator')
    }

    return (
        <View style={[styles.container, background.blue]}>
            <View style={styles.appTitleContainer}>
                <Text style={[styles.appTitle, text.lighterBlue]}>Sch</Text>
                <Text style={styles.appTitle}>edu</Text>
            </View>
            <TouchableOpacity onPress={signInWithGoogleAsync} style={styles.buttonSignIn}>
                <Text style={[styles.textSignIn, text.lightBlue]}>
                    Sign in with ITKMITL Account
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32
    },
    appTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
        alignItems: 'center'
    },
    textSignIn: {
        fontSize: 16
    }
})
