import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Agenda } from 'react-native-calendars'

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

export default function CalendarDetailScreen() {
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