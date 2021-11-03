import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { text } from '../../../styles'

export default function IncomingRequest() {

    const [requests, updateRequests] = useState([])

    const emptyRequest = (
        <View style={styles.emptyRequestContainer}>
            <FontAwesome5 name="signature" size={48} color="#cccccc" />
            <Text style={[styles.emptyRequestText, text.grey]}>No Incoming Request</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Incoming Requests</Text>
            {false ? '' : emptyRequest}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        marginTop: 8
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8
    },
    emptyRequestContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16
    },
    emptyRequestText: {
        marginVertical: 8,
        fontWeight: '300'
    }
})