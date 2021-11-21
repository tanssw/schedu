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
    const [formattedStart, setFormattedStart] = useState()
    const [formattedEnd, setFormattedEnd] = useState()

    const [activeTimeState, updateActiveTimeState] = useState({ startAt: null, endAt: null })
    useEffect(() => {
        getAppointment(data)
        getActiveTime()
    }, [])
    const getAppointment = async appointId => {
        try {
        const { token, userId } = await getAuthAsset()
        const payload = {
            headers: {
                'schedu-token': token,
                'schedu-uid': userId
            }
        }
        
            const appointmentResult = await axios.get(
                `http://localhost:3000/appointment/${appointId}`,
                payload
            )
            const appointment = appointmentResult.data.result
            setFormattedStart(appointment.startAt)
            setFormattedEnd(appointment.endAt)
            
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
        }
    }
    const getActiveTime = async () => {
        try {
            const {userId, token } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token
                }
            }
            const userResult = await axios.get(`${API_SERVER_DOMAIN}/account/${userId}`, payload)
            const user = userResult.data.user
            updateActiveTimeState(user.setting.activeTime)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    const updateAppointment = async appointmentData => {
        try {
            // if (formattedStart && formattedEnd)
            const { token } = await getAuthAsset()
            const header = {
                headers: {
                    'Schedu-Token': token
                }
            }

            const payload = {
                _id: appointmentData._id,
                subject: appointmentData.subject,
                sender: appointmentData.sender,
                receiver: appointmentData.contactId,
                status: appointmentData.status,
                participants: appointmentData.participants,

                startAt: formattedStart,
                endAt: formattedEnd,
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
               { formattedStart && formattedEnd ? <CalendarTimeSelector
                    onStartChange={setFormattedStart}
                    onEndChange={setFormattedEnd}
                    loadStart={formattedStart}
                    loadEnd={formattedEnd}
                    activeTime={activeTimeState}
                /> : null }
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
