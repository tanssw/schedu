import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Constants from 'expo-constants'

import axios from 'axios'

import TimeSelector from './components/TimeSelector'
import AppointmentDetail from './components/AppointmentDetail'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function AppointmentEditorScreen() {

    const createAppointmentHandler = async (data) => {
        const payload = {
            subject: data.subject,
            sender: "62070074",
            receiver: "62070077",
            participants: data.participants,
            comm_method: data.comm_method,
            comm_url: data.comm_url,
            note: data.note
        }
        const result = await axios.post(`${API_SERVER_DOMAIN}/appointment`, payload)
        console.log(result)
    }

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <TimeSelector />
                <AppointmentDetail onCreateAppointment={createAppointmentHandler} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})