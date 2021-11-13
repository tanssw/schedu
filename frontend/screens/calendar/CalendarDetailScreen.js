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

    }

    return (
        <Agenda
            items={myAgenda}
            selected={selectedDay}
            hideKnob={true}
        />
    )
}