import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { Agenda } from 'react-native-calendars'
import { getAuthAsset } from '../../modules/auth'
import dayjs from 'dayjs'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function CalendarDetailScreen({route, navigation}) {

    const [myAgenda, updateMyAgenda] = useState({})

    const { selectedDay } = route.params

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadAppointments()
        })
        return unsubscribe
    })

    const loadAppointments = async () => {
        const { token, userId } = await getAuthAsset()

        // Request my appointments from server
        const year = dayjs(selectedDay).get('year')
        const month = dayjs(selectedDay).get('month') + 1
        const payload = {
            headers: {
                'Schedu-Token': token,
                'Schedu-UID': userId
            }
        }
        const appointmentResult = await axios.get(`${API_SERVER_DOMAIN}/appointment/${year}/${month}`, payload)
        const appointments = appointmentResult.data.appointments

        createAgendaTemplate(year, month)
        console.log(myAgenda)
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
            selected={selectedDay}
            minDate={getFirstDate()}
            maxDate={getLastDate()}
            hideKnob={true}
        />
    )
}