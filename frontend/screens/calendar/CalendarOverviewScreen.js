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

    const [allAppointments, updateAllAppointments] = useState([])
    const [markedDates, updateMarkedDates] = useState({})
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
                'Schedu-Token': token,
                'Schedu-UID': userId
            }
        }
        const appointmentResult = await axios.get(`${API_SERVER_DOMAIN}/appointment`, payload)
        const appointments = appointmentResult.data.appointments

        // Update all appointments for calendar
        updateMarkedDates(buildDateMarks(appointments))

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

    // To build the object of MarkedDate to show in Calendar
    const buildDateMarks = (appointments) => {
        let object = {}
        appointments.forEach(appointment => {
            let date = dayjs(appointment.startAt).format('YYYY-MM-DD')
            let included = Object.keys(object).includes(date)
            if (!included) object[date] = {marked: true}
        })
        return object
    }

    const viewMonthly = (day) => {
        let date = dayjs(`${day.year}-${day.month}-${day.day}`)
        let formattedDay = date.format('MMMM YYYY')
        let selectedDay = date.format('YYYY-MM-DD')
        navigation.navigate('CalendarDetail', {
            title: `${formattedDay}`,
            selectedDay: selectedDay
        })
    }

    return (
        <ScrollView style={styles.container}>
            <CalendarOverview onDateSelect={viewMonthly} markedDates={markedDates} />
            <IncomingRequest appointments={requestAppointments} />
            <MyAppointment appointments={myAppointments} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})