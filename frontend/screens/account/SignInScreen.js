import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { background, text } from '../../styles'

export default function SignInScreen() {
    return (
        <View style={[styles.container, background.blue]}>
            <View style={styles.appTitleContainer}>
                <Text style={[styles.appTitle, text.lighterBlue]}>Sch</Text>
                <Text style={styles.appTitle}>edu</Text>
            </View>
            <TouchableOpacity style={styles.buttonSignIn}>
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