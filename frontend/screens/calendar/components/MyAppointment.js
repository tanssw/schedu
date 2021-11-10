import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import dayjs from 'dayjs'

import { colorCode, text } from '../../../styles'

export default function MyAppointment() {

    const [myAppointments, updateMyAppointments] = useState([
        {id: 1, date: '2021-11-07', start: '01:00 PM', end: '01:45 PM', participant: ['Tasanai S', 'Suphakit K']},
        {id: 2, date: '2021-11-07', start: '01:00 PM', end: '01:45 PM', participant: ['Tasanai S', 'Suphakit K']},
        {id: 3, date: '2021-11-07', start: '01:00 PM', end: '01:45 PM', participant: ['Tasanai S', 'Suphakit K']},
        {id: 4, date: '2021-11-07', start: '01:00 PM', end: '01:45 PM', participant: ['Tasanai S', 'Suphakit K']},
    ])

    const renderAppointment = (appointment) => {
        return (
            <View key={appointment.id} style={styles.appointmentItem}>
                <View>
                    <View style={styles.appointmentDesc}>
                        <Text style={styles.appointmentDate}>{dayjs(appointment.date).format('DD MMM YYYY')}</Text>
                        <Text style={styles.appointmentTime}>{appointment.start} - {appointment.end}</Text>
                    </View>
                    <Text style={styles.appointmentParticipant}>Participant: {appointment.participant.join(', ')}</Text>
                </View>
                <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const appointmentList = (
        <View>
            {myAppointments.map(appointment => renderAppointment(appointment))}
        </View>
    )

    const emptyRequest = (
        <View style={styles.emptyRequestContainer}>
            <FontAwesome5 name="signature" size={48} color="#cccccc" />
            <Text style={[styles.emptyRequestText, text.grey]}>No Appointment</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Appointments</Text>
            {true ? appointmentList : emptyRequest}
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
    appointmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12
    },
    appointmentDesc: {
        flexDirection: 'row'
    },
    appointmentDate: {
        fontWeight: 'bold',
        color: colorCode.blue,
        marginRight: 8
    },
    appointmentTime: {
        fontSize: 12,
        alignSelf: 'center'
    },
    appointmentParticipant: {
        fontSize: 12,
        color: 'grey',
        marginTop: 4
    },
    viewButton: {
        borderWidth: 1,
        borderColor: colorCode.blue,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    viewButtonText: {
        fontSize: 12,
        color: colorCode.blue
    }
})