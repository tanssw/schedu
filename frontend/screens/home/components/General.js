import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colorCode, shadow } from '../../../styles'

export default function General() {
    return (
        <View style={styles.container}>
            <View style={[styles.informationCard, shadow.boxBottomSmall]}>
                <View style={styles.decorationContainer}>
                    <View style={styles.line} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>Make your appointment with</Text>
                    <Text style={styles.title}>Schedu</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    informationCard: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: colorCode.blue,
        flexDirection: 'row',
        alignItems: 'center'
    },
    decorationContainer: {

    },
    textContainer: {
        marginLeft: 16
    },
    title: {
        fontSize: 32,
        fontWeight: '300',
        color: 'white'
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '300',
        color: 'white'
    },
    line: {
        flex: 1,
        width: 8,
        backgroundColor: colorCode.yellow,
        borderRadius: 256,
    },
})