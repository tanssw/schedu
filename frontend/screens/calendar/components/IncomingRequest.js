import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import dayjs from 'dayjs'

import { text, colorCode } from '../../../styles'

export default function IncomingRequest(props) {

    const [requests, updateRequests] = useState([
        {id: 1, from: 'Tasanai Srisawat', date: '2021-10-08', start: '01:00 PM', end: '01:45 PM'},
        {id: 2, from: 'Tasanai Srisawat', date: '2021-10-08', start: '01:00 PM', end: '01:45 PM'},
        {id: 3, from: 'Tasanai Srisawat', date: '2021-10-08', start: '01:00 PM', end: '01:45 PM'},
        {id: 4, from: 'Tasanai Srisawat', date: '2021-10-08', start: '01:00 PM', end: '01:45 PM'},
    ])

    const renderRequest = (request) => {
        return (
            <TouchableOpacity key={request._id} style={styles.requestItem}>
                <FontAwesome name="user-circle-o" size={42} color={colorCode.blue} />
                <View style={styles.requestBody}>
                    <View style={styles.requestTitle}>
                        <Text>Appointment Request</Text>
                        <Text style={text.bold}>{dayjs(request.startAt).format('DD MMM YYYY')}</Text>
                    </View>
                    <View style={styles.requestDesc}>
                        <Text style={styles.smallDesc}>from {request.sender.firstName} {request.sender.lastName[0]}.</Text>
                        <Text style={styles.smallDesc}>
                            {dayjs(request.startAt).format('HH:mm')} - {dayjs(request.endAt).format('HH:mm')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const requestList = (
        <View>
            {props.appointments.map(request => renderRequest(request))}
        </View>
    )

    const emptyRequest = (
        <View style={styles.emptyRequestContainer}>
            <FontAwesome5 name="signature" size={48} color="#cccccc" />
            <Text style={[styles.emptyRequestText, text.grey]}>No Incoming Request</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Incoming Requests</Text>
            {props.appointments.length ? requestList : emptyRequest}
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
    },
    requestItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8
    },
    requestBody: {
        flex: 1,
        marginLeft: 16
    },
    requestTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
    requestDesc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
    smallDesc: {
        fontSize: 12,
        color: 'grey'
    }
})