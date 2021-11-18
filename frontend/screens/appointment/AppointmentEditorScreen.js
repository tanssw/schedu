import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../modules/apis'
import { clearAuthAsset, getAuthAsset } from '../../modules/auth'

import TimeSelector from './components/TimeSelector'
import AppointmentDetail from './components/AppointmentDetail'
import { checkExpiredToken } from '../../modules/auth'

export default function AppointmentEditorScreen({ route, navigation }) {

    const timeSelectorComponent = useRef()
    const detailComponent = useRef()

    const [formattedStart, setFormattedStart] = useState()
    const [formattedEnd, setFormattedEnd] = useState()

    const { contactId, date } = route.params

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
            receiver: contactId,
            participants: data.participants,
            startAt: formattedStart,
            endAt: formattedEnd,
            commMethod: data.commMethod,
            commUrl: data.commUrl,
            note: data.note,
        }

        try {
            const result = await axios.post(`${API_SERVER_DOMAIN}/appointment`, payload, header)
            timeSelectorComponent.current.resetChildState()
            detailComponent.current.resetChildState()
            navigation.navigate('ContactProfile', { contactId: contactId })
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <TimeSelector ref={timeSelectorComponent} date={date} onStartChange={setFormattedStart} onEndChange={setFormattedEnd} />
                <AppointmentDetail ref={detailComponent} onCreateAppointment={createAppointmentHandler} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1
    }
})