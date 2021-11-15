import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import axios from 'axios'

import { getAuthAsset } from '../../modules/auth'

import TimeSelector from './components/TimeSelector'
import AppointmentDetail from './components/AppointmentDetail'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function AppointmentEditorScreen() {

    const timeSelectorComponent = useRef()
    const detailComponent = useRef()

    const [formattedStart, setFormattedStart] = useState()
    const [formattedEnd, setFormattedEnd] = useState()

    const createAppointmentHandler = async (data) => {
        const { token, userId } = await getAuthAsset()
        const header = {
            headers: {
                'Schedu-Token': token
            }
        }
        const payload = {
            subject: data.subject,
            sender: userId,
            receiver: "618b4cc8a996fac981059a69",
            participants: data.participants,
            startAt: formattedStart,
            endAt: formattedEnd,
            commMethod: data.commMethod,
            commUrl: data.commUrl,
            note: data.note
        }

        try {
            const result = await axios.post(`${API_SERVER_DOMAIN}/appointment`, payload, header)
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