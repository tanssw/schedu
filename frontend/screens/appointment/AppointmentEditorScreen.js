import React, { useRef, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Constants from 'expo-constants'

import axios from 'axios'

import TimeSelector from './components/TimeSelector'
import AppointmentDetail from './components/AppointmentDetail'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function AppointmentEditorScreen() {

    const [formattedStart, setFormattedStart] = useState()
    const [formattedEnd, setFormattedEnd] = useState()

    const createAppointmentHandler = async (data) => {
        const payload = {
            subject: data.subject,
            sender: "62070074",
            receiver: "62070077",
            participants: data.participants,
            startAt: formattedStart,
            endAt: formattedEnd,
            commMethod: data.commMethod,
            commUrl: data.commUrl,
            note: data.note
        }

        console.log(payload)

        try {
            const result = await axios.post(`${API_SERVER_DOMAIN}/appointment`, payload)
        } catch (error) {

        }
    }

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <TimeSelector onStartChange={setFormattedStart} onEndChange={setFormattedEnd} />
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