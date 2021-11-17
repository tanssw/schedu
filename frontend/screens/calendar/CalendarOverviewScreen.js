import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import dayjs from 'dayjs'
import axios from 'axios'

import { getAuthAsset, checkExpiredToken } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import CalendarOverview from './components/CalendarOverview'
import IncomingRequest from './components/IncomingRequest'
import MyAppointment from './components/MyAppointment'
import { colorCode } from '../../styles'

export default function CalendarOverviewScreen({navigation}) {

    const [markedDatesState, updateMarkedDatesState] = useState({})
    const [requestAppointmentsState, updateRequestAppointmentsState] = useState([])
    const [myAppointmentsState, updateMyAppointmentsState] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const { myAppointments, requestAppointments } = await loadAppointments()
            const events = await loadEvents()

            updateMyAppointmentsState(myAppointments)
            updateRequestAppointmentsState(requestAppointments)

            // Update all appointments for calendar
            const appointmentDateMarks = buildAppointmentDateMarks(myAppointments)
            const allDateMarks = buildEventDateMarks(events, appointmentDateMarks)
            updateMarkedDatesState(allDateMarks)
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

            // Update incoming request appointments
            let requestAppointments = appointments.filter(appointment => {
                const myself = appointment.participants.find(participant => participant.userId === userId)
                if (!myself) return false
                const meNotConfirm = !myself.confirmed
                const meAsSender = appointment.sender.userId === userId
                return !meAsSender && meNotConfirm
            })

            return { myAppointments, requestAppointments }

        } catch (error) {
            if (checkExpiredToken(error)) navigation.navigate('SignIn')
        }
    }

    const loadEvents = async () => {
        try {
            const eventResult = await axios.get(`${API_SERVER_DOMAIN}/event`)
            const events = eventResult.data.events
            return events
        } catch (error) {

        }
    }

    // To build an appointment object of MarkedDate to show in Calendar
    const buildAppointmentDateMarks = (appointments, object={}) => {
        appointments.forEach(appointment => {
            let date = dayjs(appointment.startAt).format('YYYY-MM-DD')
            let included = Object.keys(object).includes(date)
            if (!included) object[date] = {marked: true, dotColor: colorCode.lightBlue}
        })
        return object
    }

    // To build an event object of MarrkedDte to show in Calendar
    const buildEventDateMarks = (events, object={}) => {
        events.forEach(event => {
            if (!event.date) return
            let date = dayjs(event.date).format('YYYY-MM-DD')
            let included = Object.keys(object).includes(date)
            if (!included) object[date] = {marked: true, dotColor: colorCode.grey}
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
            <View style={styles.innerContainer}>
                <CalendarOverview onDateSelect={viewMonthly} markedDates={markedDatesState} />
                <IncomingRequest appointments={requestAppointmentsState} />
                <MyAppointment appointments={myAppointmentsState} />
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