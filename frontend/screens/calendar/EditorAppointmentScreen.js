import React, { useCallback, useRef, useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    FlatList
} from 'react-native'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../modules/apis'
import { clearAuthAsset, getAuthAsset } from '../../modules/auth'

import dayjs from 'dayjs'

import { checkExpiredToken } from '../../modules/auth'
import { background, text, shadow, colorCode } from '../../styles'
import CalendarAppointmentDetail from './components/CalendarAppointmentDetail'
import CalendarTimeSelector from './components/CalendarTimeSelector'

export default function EditAppointmentScreen({ route, navigation }) {
    const { data } = route.params
    const [date, setDate] = useState()
    const [formattedStart, setFormattedStart] = useState(true)
    const [formattedEnd, setFormattedEnd] = useState(true)
    useEffect(() => {
        const date = dayjs(data.startAt).format('YYYY-MM-DD')
        setDate(data.startAt)
        const start = dayjs(data.startAt).format('HH:MM')
        const end = dayjs(data.endAt).format('HH:MM')
        setFormattedStart(start)
        setFormattedEnd(end)
    }, [])

    const updateAppointment = async appointmentData => {
        try {
            // if (formattedStart && formattedEnd)
            const { token} = await getAuthAsset()
            const header = {
                headers: {
                    'Schedu-Token': token,
                }
            }

            const payload = {
                _id: appointmentData._id,
                subject: appointmentData.subject,
                sender: appointmentData.sender,
                receiver: appointmentData.contactId,
                status: appointmentData.status,
                participants: appointmentData.participants,
                
                startAt: '2021-11-17T02:15:00.000+00:00',
                endAt: '2021-11-17T03:00:00.000+00:00',
                commMethod: appointmentData.commMethod,
                commUrl: appointmentData.commUrl,
                note: appointmentData.note
            }
            
            await axios.put(`http://localhost:3000/appointment/`, payload, header)
            navigation.navigate('Appointment', { data: payload })
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
                {/* <CalendarTimeSelector
                    ref={timeSelectorComponent}
                    date={date}
                    onStartChange={setFormattedStart}
                    onEndChange={setFormattedEnd}
                    activeTime={route.params.activeTime}
                /> */}
                <CalendarAppointmentDetail
                    appointment={data}
                    updateAppointment={updateAppointment}
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
