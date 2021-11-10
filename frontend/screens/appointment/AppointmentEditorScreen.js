import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Constants from 'expo-constants'

import axios from 'axios'

import TimeSelector from './components/TimeSelector'
import AppointmentDetail from './components/AppointmentDetail'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function AppointmentEditorScreen() {

    const timeSelectorComponent = useRef()
    const detailComponent = useRef()

    const [formattedStart, setFormattedStart] = useState()
    const [formattedEnd, setFormattedEnd] = useState()

    const createAppointmentHandler = async (data) => {
        const payload = {
            subject: data.subject,
            sender: "6189ea797b52117c02879274",
            receiver: "618b3670ea4fd363e6214a52",
            participants: data.participants,
            startAt: formattedStart,
            endAt: formattedEnd,
            commMethod: data.commMethod,
            commUrl: data.commUrl,
            note: data.note
        }

        try {
            const result = await axios.post(`${API_SERVER_DOMAIN}/appointment`, payload)
            timeSelectorComponent.current.resetChildState()
            detailComponent.current.resetChildState()
        } catch (error) {

        }
    }

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <TimeSelector ref={timeSelectorComponent} onStartChange={setFormattedStart} onEndChange={setFormattedEnd} />
                <AppointmentDetail ref={detailComponent} onCreateAppointment={createAppointmentHandler} />
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