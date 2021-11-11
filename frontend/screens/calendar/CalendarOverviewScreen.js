import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import dayjs from 'dayjs'
import axios from 'axios'

import CalendarOverview from './components/CalendarOverview'
import IncomingRequest from './components/IncomingRequest'
import MyAppointment from './components/MyAppointment'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function CalendarOverviewScreen({navigation}) {

    const [myAppointments, updateMyAppointments] = useState([])
    const [ongoingAppointments, updateOngoingAppointments] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadAppointments()
        })
        return unsubscribe
    })

    const loadAppointments = async () => {
        // Request my appointments from server
        // TODO: query from real user id
        const appointmentResult = await axios.get(`${API_SERVER_DOMAIN}/appointment/6189ea797b52117c02879274`)
        const appointments = appointmentResult.data.appointments

        // Update state with new appointments
        const shownStatus = ['ongoing']
        updateMyAppointments(appointments.filter(appointment => shownStatus.includes(appointment.status)))
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
            <IncomingRequest />
            <MyAppointment appointments={myAppointments} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})