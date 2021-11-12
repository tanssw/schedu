import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'
import axios from 'axios'

import { getAuthAsset } from '../../modules/auth'

import CalendarOverview from './components/CalendarOverview'
import IncomingRequest from './components/IncomingRequest'
import MyAppointment from './components/MyAppointment'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function CalendarOverviewScreen({navigation}) {

    const [requestAppointments, updateRequestAppointments] = useState([])
    const [myAppointments, updateMyAppointments] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadAppointments()
        })
        return unsubscribe
    })

    const loadAppointments = async () => {

        const { token, userId } = await getAuthAsset()

        // Request my appointments from server
        const payload = {
            headers: {
                'Schedu-Token': token
            }
        }
        const appointmentResult = await axios.get(`${API_SERVER_DOMAIN}/appointment`, payload)
        const appointments = appointmentResult.data.appointments

        // Update my appointments
        const shownStatus = ['ongoing']
        updateMyAppointments(
            appointments.filter(appointment => {
                const canShow = shownStatus.includes(appointment.status)
                const meAsSender = appointment.sender.userId === userId
                return canShow || meAsSender
            })
        )

        // Update incoming request appointments
        updateRequestAppointments(
            appointments.filter(appointment => {
                const myself = appointment.participants.find(participant => participant.userId === userId)
                if (!myself) return false
                const meNotConfirm = !myself.confirmed
                const meAsSender = appointment.sender.userId === userId
                return !meAsSender && meNotConfirm
            })
        )
    }

    const viewMonthly = (day) => {
        let formattedDay = dayjs(`${day.year}-${day.month}-${day.day}`).format('MMMM YYYY')
        navigation.navigate('CalendarDetail', {
            title: `${formattedDay}`
        })
    }

    return (
        <ScrollView style={styles.container}>
            <CalendarOverview onDateSelect={viewMonthly} />
            <IncomingRequest appointments={requestAppointments} />
            <MyAppointment appointments={myAppointments} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})