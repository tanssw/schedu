import axios from 'axios'
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import { Agenda } from 'react-native-calendars'
import { getAuthAsset } from '../../modules/auth'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

const myAgenda = {
    '2021-11-04': [
        {
            name: 'item 1 - any js object'
        },
        {
            name: 'item 1 - any js object'
        },
        {
            name: 'item 1 - any js object'
        },
    ]
}

export default function CalendarDetailScreen({navigation}) {

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
        console.log(appointments)
    }

    return (
        <Agenda
            items={myAgenda}
            minDate="2021-11-01"
            maxDate="2021-11-30"
            pastScrollRange={1}
            futureScrollRange={1}
        />
    )
}