import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import dayjs from 'dayjs'

import { colorCode, text } from '../../../styles'

export default function MyAppointment(props) {

    const getParticipant = (participants) => {
        const receiver = participants.filter(participant => participant.main === true)
        const receiverText = receiver.map((participant, index) => `${participant.firstName} ${participant.lastName[0]}.`)

        const other = participants.filter(participant =>  participant.main !== true)
        const otherText = other.length ? `and ${other.length} more` : ''
        return `${receiverText} ${otherText}`
    }

    const renderAppointment = (appointment) => {
        return (
            <TouchableOpacity key={appointment._id} style={styles.appointmentItem}>
                <View>
                    <View style={styles.appointmentDesc}>
                        <Text style={styles.appointmentDate}>
                            {dayjs(appointment.startAt).format('DD MMM YYYY')}
                        </Text>
                        <Text style={styles.appointmentTime}>
                            {dayjs(appointment.startAt).format('HH:mm')} - {dayjs(appointment.endAt).format('HH:mm')}
                        </Text>
                    </View>
                    <Text style={styles.appointmentParticipant}>
                        with {getParticipant(appointment.participants)}
                    </Text>
                </View>
                <View style={styles.status}>
                    <Text style={styles.statusText}>{appointment.status}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const appointmentList = (
        <View>
            {props.appointments.map(appointment => renderAppointment(appointment))}
        </View>
    )

    const emptyRequest = (
        <View style={styles.emptyRequestContainer}>
            <FontAwesome5 name="signature" size={48} color="#cccccc" />
            <Text style={[styles.emptyRequestText, text.grey]}>Feel free to contact someone</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Appointments</Text>
            {props.appointments.length ? appointmentList : emptyRequest}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        marginTop: 8,
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
    status: {
        borderWidth: 1,
        borderColor: colorCode.blue,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    statusText: {
        fontSize: 12,
        color: colorCode.blue
    }
})