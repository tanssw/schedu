import React, { useRef, useState, useEffect } from 'react'
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

    const { contactId, date, participant } = route.params

    const goChooseParticipants = data => {
        navigation.navigate('ChooseParticipants', data)
    }

    const updateHandler = () => {
        navigation.setParams({ participant: null })
    }

    const createAppointmentHandler = async data => {
        const { token, userId } = await getAuthAsset()
        const header = {
            headers: {
                'Schedu-Token': token
            }
        }

        try {
            if (formattedStart && formattedEnd) {
                const payload = {
                    subject: data.subject,
                    sender: userId,
                    receiver: contactId,
                    participants: data.participants,
                    startAt: formattedStart,
                    endAt: formattedEnd,
                    commMethod: data.commMethod,
                    commUrl: data.commUrl,
                    note: data.note
                }
                const result = await axios.post(`${API_SERVER_DOMAIN}/appointment`, payload, header)
                navigation.navigate('ContactProfile', { contactId: contactId })
                timeSelectorComponent.current.resetChildState()
                detailComponent.current.resetChildState()
                navigation.navigate('ContactProfile', { contactId: contactId })
            } else {
                alert('Start / End Time is required')
            }
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
                <TimeSelector
                    ref={timeSelectorComponent}
                    date={date}
                    onStartChange={setFormattedStart}
                    onEndChange={setFormattedEnd}
                    activeTime={route.params.activeTime}
                />
                <AppointmentDetail
                    ref={detailComponent}
                    data={{ contactId: contactId, date: date, activeTime: route.params.activeTime }}
                    onCreateAppointment={createAppointmentHandler}
                    navigation={navigation}
                    participant={participant}
                    chooseParticipant={goChooseParticipants}
                    onUpdateParticipant={updateHandler}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    innerContainer: {
        flex: 1
    }
})
