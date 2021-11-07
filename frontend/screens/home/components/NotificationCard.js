import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { text, colorCode } from '../../../styles'

export default function NotificationCard(props) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onAppointmentPress} style={styles.viewAppointment}>
                <Text style={text.grey}>View All Appointments</Text>
                <Entypo name="chevron-small-right" size={18} color={colorCode.grey} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    viewAppointment: {
        textAlign: 'center',
        fontWeight: '300',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8
    }
})