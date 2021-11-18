import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars'
import axios from 'axios'
import dayjs from 'dayjs'

import { checkExpiredToken, getAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import { colorCode, shadow } from '../../styles'

export default function CalendarDetailScreen({route, navigation}) {

    const [myAgenda, updateMyAgenda] = useState({})

    const { selectedDay } = route.params

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // Request my appointments from server
            const year = dayjs(selectedDay).get('year')
            const month = dayjs(selectedDay).get('month') + 1

            const appointments = await loadAppointments(year, month)
            const events = await loadEvents(year, month)

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

            updateMyAgenda(myAgenda)

        })
        return unsubscribe
    })

    const loadAppointments = async (year, month) => {
        const { token, userId } = await getAuthAsset()
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
            if (checkExpiredToken(error)) navigation.navigate('SignIn')
        }
    }

    const loadEvents = async (year, month) => {
        try {
            const eventResult = await axios.get(`${API_SERVER_DOMAIN}/event/${year}/${month}`)
            const events = eventResult.data.events
            return events
        } catch (error) {

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
            return []
        }
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
        }
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

    const renderAppointment = (item, firstItem) => {
        return (
            <View style={[styles.eventBox, shadow.boxBottomSmall, {marginTop: (firstItem) ? 16: 6}]}>
                <Text style={styles.eventTime}>
                    {dayjs(item.startAt).format('HH:mm')} — {dayjs(item.endAt).format('HH:mm')}
                </Text>
                <Text numberOfLines={1} style={styles.eventHeader}>{item.subject}</Text>
                <Text style={styles.eventDesc}>with {getParticipant(item.participants)}</Text>
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
            hideKnob={true}
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
    eventTime: {
        fontWeight: '300',
        marginBottom: 4
    },
    eventHeader: {
        fontSize: 16,
        fontWeight: '300',
        color: colorCode.lightBlue,
        marginBottom: 8
    },
    eventDesc: {
        color: colorCode.grey
    }
})