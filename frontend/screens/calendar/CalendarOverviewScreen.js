import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import dayjs from 'dayjs'
import axios from 'axios'

import { getAuthAsset, checkExpiredToken, clearAuthAsset } from '../../modules/auth'
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
            try {
                const { token, userId } = await getAuthAsset()

                const { myAppointments, requestAppointments } = await loadAppointments(token, userId)
                const events = await loadEvents()
                const studies = await loadStudies(token, userId)

                updateMyAppointmentsState(myAppointments)
                updateRequestAppointmentsState(requestAppointments)

                // Update all appointments for calendar
                const appointmentDateMarks = buildAppointmentDateMarks(myAppointments)
                const eventDateMarks = buildEventDateMarks(events, appointmentDateMarks)
                const examDateMarks = buildExamDateMarks(studies, eventDateMarks)
                updateMarkedDatesState(examDateMarks)
            } catch (error) {

            }
        })
        return unsubscribe
    })

    const loadAppointments = async (token, userId) => {

        try {
            // Request my appointments from server
            const payload = {
                headers: {
                    'Schedu-Token': token,
                    'Schedu-UID': userId
                }
            }

            const appointmentResult = await axios.get(`${API_SERVER_DOMAIN}/appointment`, payload)
            const appointments = appointmentResult.data.appointments

            // Update my appointments
            const ignoredStatus = ['abandoned', 'done']
            let myAppointments = appointments.filter(appointment => {
                const canShow = !ignoredStatus.includes(appointment.status)
                const meConfirmed = appointment.participants.filter(participant => participant.userId == userId && participant.confirmed)
                const meAsSender = appointment.sender.userId === userId
                return canShow && (meAsSender || meConfirmed.length)
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
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
            return []
        }
    }

    const loadEvents = async () => {
        try {
            const eventResult = await axios.get(`${API_SERVER_DOMAIN}/event`)
            const events = eventResult.data.events
            return events
        } catch (error) {
            return []
        }
    }

    const loadStudies = async (token, userId) => {
        const payload = {
            headers: {
                'Schedu-Token': token,
                'Schedu-UID': userId
            }
        }

        try {
            const timetableResult = await axios.get(`${API_SERVER_DOMAIN}/registrar/courses`, payload)
            const timetable = timetableResult.data.timetable
            return timetable
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
            return []
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

    // To build an event object of MarkedDate to show in Calendar
    const buildEventDateMarks = (events, object={}) => {
        events.forEach(event => {
            if (!event.date) return
            let date = dayjs(event.date).format('YYYY-MM-DD')
            let included = Object.keys(object).includes(date)
            if (!included) object[date] = {marked: true, dotColor: colorCode.grey}
        })
        return object
    }

    // To build an study timetable object of MarkedDte to show in Calendar
    const buildExamDateMarks = (courses, object={}) => {
        courses.forEach(course => {
            let date, included
            if (course.midterm.date) {
                date = dayjs(course.midterm.date).format('YYYY-MM-DD')
                included = Object.keys(object).includes(date)
                if (!included) object[date] = {marked: true, dotColor: colorCode.orange}
            }
            if (course.final.date) {
                date = dayjs(course.final.date).format('YYYY-MM-DD')
                included = Object.keys(object).includes(date)
                if (!included) object[date] = {marked: true, dotColor: colorCode.orange}
            }
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