import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { useNavigation } from '@react-navigation/native'

import { colorCode, text } from '../../../styles'

export default function MyAppointment(props) {

    const navigation = useNavigation()

    const getParticipant = (sender, participants) => {
        let personText
        if (sender.userId === props.userId) {
            let receiver = participants.filter(participant => participant.main === true)
            personText = receiver.map((participant, index) => `${participant.firstName} ${participant.lastName[0]}.`)
        } else {
            personText = `${sender.firstName} ${sender.lastName[0]}.`
        }

        let other = participants.filter(participant =>  participant.main !== true)
        let otherText = other.length ? `and ${other.length} more` : ''
        return `${personText} ${otherText}`

    }

    const renderAppointment = (appointment) => {
        return (
            <TouchableOpacity key={appointment._id} style={styles.appointmentItem} onPress={() =>{
                navigation.navigate('Appointment', { data: appointment}, props.getAppointmentId(appointment._id))
            }}>
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
                        with {getParticipant(appointment.sender, appointment.participants)}
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