import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'

import { text, colorCode, shadow } from '../../../styles'

export default function NotificationCard(props) {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.notificationCard, shadow.boxBottomSmall]}>
                <View>
                    <Text style={[styles.notificationHeader, text.green]}>New Request</Text>
                    <View>
                        <Text style={styles.notificationDetail}>from Tasanai Srisawat</Text>
                        <Text style={styles.notificationDetail}>07 November 2021 at 15:00 - 15:15</Text>
                    </View>
                </View>
                <Ionicons name="mail-unread-outline" size={42} color={colorCode.green} />
            </TouchableOpacity>
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
    },
    notificationCard: {
        borderWidth: 1,
        borderRadius: 16,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    notificationHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4
    },
    notificationDetail: {
        fontSize: 12,
        fontWeight: '300',
        marginTop: 4
    }
})