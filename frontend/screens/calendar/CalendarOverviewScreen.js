import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import dayjs from 'dayjs'
import axios from 'axios'

import { getAuthAsset, checkExpiredToken } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import CalendarOverview from './components/CalendarOverview'
import IncomingRequest from './components/IncomingRequest'
import MyAppointment from './components/MyAppointment'

export default function CalendarOverviewScreen({navigation}) {

    const [markedDatesState, updateMarkedDatesState] = useState({})
    const [requestAppointmentsState, updateRequestAppointmentsState] = useState([])
    const [myAppointmentsState, updateMyAppointmentsState] = useState([])

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
        try {
            const appointmentResult = await axios.get(`${API_SERVER_DOMAIN}/appointment`, payload)
            const appointments = appointmentResult.data.appointments

            // Update my appointments
            const shownStatus = ['ongoing']
            let myAppointments = appointments.filter(appointment => {
                const canShow = shownStatus.includes(appointment.status)
                const meConfirmed = appointment.participants.filter(participant => participant.userId == userId && participant.confirmed)
                const meAsSender = appointment.sender.userId === userId
                return canShow || meAsSender || meConfirmed.length
            })
            updateMyAppointmentsState(myAppointments)

            // Update incoming request appointments
            let requestAppointments = appointments.filter(appointment => {
                const myself = appointment.participants.find(participant => participant.userId === userId)
                if (!myself) return false
                const meNotConfirm = !myself.confirmed
                const meAsSender = appointment.sender.userId === userId
                return !meAsSender && meNotConfirm
            })
            updateRequestAppointmentsState(requestAppointments)

            // Update all appointments for calendar
            updateMarkedDatesState(buildDateMarks(myAppointments))

        } catch (error) {
            if (checkExpiredToken(error)) navigation.navigate('SignIn')
        }
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

    // On day clicked, will show monthly agenda
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
            <CalendarOverview onDateSelect={viewMonthly} markedDates={markedDatesState} />
            <IncomingRequest appointments={requestAppointmentsState} />
            <MyAppointment appointments={myAppointmentsState} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {}
})
