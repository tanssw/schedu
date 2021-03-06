import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import axios from 'axios'
import dayjs from 'dayjs'

import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import { colorCode, shadow } from '../../styles'

export default function CalendarDetailScreen({route, navigation}) {

    const [myAgenda, updateMyAgenda] = useState({})

    const { selectedDay } = route.params

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

            const { token, userId } = await getAuthAsset()
            const year = dayjs(selectedDay).get('year')
            const month = dayjs(selectedDay).get('month') + 1

            // Request my agenda from server
            const appointments = await loadAppointments(year, month, token, userId)
            const events = await loadEvents(year, month)
            const studies = await loadStudies(year, month, token, userId)

            createAgendaTemplate(year, month)

            // Add appointments into each day
            appointments.forEach(appointment => {
                let date = dayjs(appointment.startAt).format('YYYY-MM-DD')
                appointment._cardType = 'appointment'
                myAgenda[date].push(appointment)
            })

            // Add events into each day
            events.forEach(event => {
                let date = dayjs(event.date).format('YYYY-MM-DD')
                event._cardType = 'event'
                myAgenda[date].push(event)
            })

            // Add exams into each day
            studies.forEach(course => {
                let date = dayjs(course.exam.date).format('YYYY-MM-DD')
                course._cardType = 'study'
                myAgenda[date].push(course)
            })

            updateMyAgenda(myAgenda)

        })
        return unsubscribe
    })

    const loadAppointments = async (year, month, token, userId) => {
        const payload = {
            headers: {
                'Schedu-Token': token,
                'Schedu-UID': userId
            }
        }
        try {
            const appointmentResult = await axios.get(`${API_SERVER_DOMAIN}/appointment/${year}/${month}`, payload)
            const appointments = appointmentResult.data.appointments
            return appointments
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
            return []
        }
    }

    const loadEvents = async (year, month) => {
        try {
            const eventResult = await axios.get(`${API_SERVER_DOMAIN}/event/${year}/${month}`)
            const events = eventResult.data.events
            return events
        } catch (error) {
            return []
        }
    }

    const loadStudies = async (year, month, token, userId) => {
        const payload = {
            headers: {
                'Schedu-Token': token,
                'Schedu-UID': userId
            }
        }

        try {
            const timetableResult = await axios.get(`${API_SERVER_DOMAIN}/registrar/courses/${year}/${month}`, payload)
            const timetable = timetableResult.data.timetable
            return timetable
        } catch (error) {
            return []
        }
    }

    const navigateToAppointment = (appointment) => {
        navigation.navigate('Appointment', {data: appointment} )
    }

    // Create empty date arrays for agenda
    const createAgendaTemplate = (year, month) => {
        const minDate = dayjs(`${year}-${month}-01`)
        const lastDate = minDate.daysInMonth()

        for (let day=1; day<=lastDate; day++) {
            let date = dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD')
            myAgenda[date] = []
        }
        updateMyAgenda(myAgenda)

    }

    const renderItem = (item, firstItem) => {
        switch (item._cardType) {
            case 'appointment': return renderAppointment(item, firstItem)
            case 'event': return renderEvent(item, firstItem)
            case 'study': return renderStudy(item, firstItem)
        }
    }

    const renderAppointment = (item, firstItem) => {
        return (
            <TouchableOpacity onPress={() => {navigateToAppointment(item)}} style={[styles.eventBox, shadow.boxBottomSmall, {marginTop: (firstItem) ? 16: 6}]}>
                <Text style={styles.eventTime}>
                    {dayjs(item.startAt).format('HH:mm')} - {dayjs(item.endAt).format('HH:mm')}
                </Text>
                <Text numberOfLines={1} style={styles.eventHeader}>{item.subject}</Text>
                <Text style={styles.eventDesc}>with {getParticipant(item.participants)}</Text>
            </TouchableOpacity>
        )
    }

    const renderEvent = (item, firstItem) => {
        return (
            <View style={[styles.eventBox, shadow.boxBottomSmall, {marginTop: (firstItem) ? 16: 6}]}>
                <Text style={styles.eventTime}>
                    All-day
                </Text>
                <Text numberOfLines={1} style={[styles.eventHeader, {color: colorCode.gold}]}>{item.title}</Text>
                <Text style={styles.eventDesc}>{item.type}</Text>
            </View>
        )
    }

    const renderStudy = (item, firstItem) => {
        const startAt = dayjs(`${dayjs().format('YYYY-MM-DD')} ${item.exam.startAt}`, 'YYYY-MM-DD HH:mm:ss')
        const endAt = dayjs(`${dayjs().format('YYYY-MM-DD')} ${item.exam.endAt}`, 'YYYY-MM-DD HH:mm:ss')
        return (
            <View style={[styles.eventSmallBox, shadow.boxBottomSmall, {marginTop: (firstItem) ? 16: 6}]}>
                <Text style={styles.eventSmallTime}>
                    {startAt.format('HH:mm')} - {endAt.format('HH:mm')} ({item.exam.type} exam)
                </Text>
                <Text numberOfLines={1} style={[styles.eventSmallHeader, {color: colorCode.orange}]}>{item.title}</Text>
            </View>
        )
    }

    const getParticipant = (participants) => {
        const receiver = participants.filter(participant => participant.main === true)
        const receiverText = receiver.map((participant, index) => `${participant.firstName} ${participant.lastName[0]}.`)

        const other = participants.filter(participant =>  participant.main !== true)
        const otherText = other.length ? `and ${other.length} more` : ''
        return `${receiverText} ${otherText}`
    }

    const getFirstDate = () => {
        let date = dayjs(selectedDay)
        return `${date.get('year')}-${date.get('month')}-01`
    }

    const getLastDate = () => {
        let date = dayjs(selectedDay)
        return `${date.get('year')}-${date.daysInMonth()}`
    }

    return (
        <Agenda
            items={myAgenda}
            renderItem={renderItem}
            selected={selectedDay}
            minDate={getFirstDate()}
            maxDate={getLastDate()}
            pastScrollRange={1}
            futureScrollRange={1}
            hideKnob={true}
            refreshing={true}
            theme={{
                selectedDayBackgroundColor: colorCode.lightBlue,
                selectedDayTextColor: 'white',
                dotColor: colorCode.lighterBlue,
                todayTextColor: colorCode.lightBlue,
                agendaTodayColor: colorCode.blue
            }}
        />
    )
}

const styles = StyleSheet.create({
    eventBox: {
        backgroundColor: 'white',
        padding: 16,
        marginRight: 16,
        marginVertical: 6,
        borderRadius: 16
    },
    eventSmallBox: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 16,
        marginVertical: 6,
        borderRadius: 16
    },
    eventTime: {
        fontWeight: '300',
        marginBottom: 4
    },
    eventSmallTime: {
        fontWeight: '300',
        fontSize: 12
    },
    eventHeader: {
        fontSize: 16,
        fontWeight: '300',
        color: colorCode.lightBlue,
        marginBottom: 8
    },
    eventSmallHeader: {
        fontSize: 14,
        fontWeight: '300',
        color: colorCode.lightBlue,
    },
    eventDesc: {
        color: colorCode.grey
    }
})