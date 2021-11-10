import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Constants from 'expo-constants'
import { FontAwesome5 } from '@expo/vector-icons'
import dayjs from 'dayjs'

import { colorCode, text } from '../../../styles'
import axios from 'axios'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

function MyAppointment(props, ref) {

    const [myAppointments, updateMyAppointments] = useState([])

    useImperativeHandle(ref, () => ({
        async loadAppointments() {
            // Request my appointments from server
            const appointmentResult = await axios.get(`${API_SERVER_DOMAIN}/appointment/6189ea797b52117c02879274`)
            const appointments = appointmentResult.data.appointments
            // Update state with new appointments
            updateMyAppointments(appointments)
        }
    }), [])

    const renderAppointment = (appointment) => {
        return (
            <View key={appointment._id} style={styles.appointmentItem}>
                <View>
                    <View style={styles.appointmentDesc}>
                        <Text style={styles.appointmentDate}>
                            {dayjs(appointment.date).format('DD MMM YYYY')}
                        </Text>
                        <Text style={styles.appointmentTime}>
                            {dayjs(appointment.startAt).format('HH:mm')} - {dayjs(appointment.endAt).format('HH:mm')}
                        </Text>
                    </View>
                    <Text style={styles.appointmentParticipant}>
                        Participant: {appointment.participants.map((participant, index) => `${index ? ', ' : ''}${participant.firstName}`)}
                    </Text>
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
            {myAppointments.length ? appointmentList : emptyRequest}
        </View>
    )
}

export default forwardRef(MyAppointment)

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