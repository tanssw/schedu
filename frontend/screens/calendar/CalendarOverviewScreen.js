import React, { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import dayjs from 'dayjs'

import CalendarOverview from './components/CalendarOverview'
import IncomingRequest from './components/IncomingRequest'
import MyAppointment from './components/MyAppointment'

export default function CalendarOverviewScreen({navigation}) {

    const myAppointmentComponent = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            myAppointmentComponent.current.loadAppointments()
        })
    })

    const viewMonthly = (day) => {
        let formattedDay = dayjs(`${day.year}-${day.month}-${day.day}`).format('MMMM YYYY')
        navigation.navigate('CalendarDetail', {
            title: `${formattedDay}`
        })
    }

    return (
        <ScrollView style={styles.container}>
            <CalendarOverview onDateSelect={viewMonthly} />
            <IncomingRequest />
            <MyAppointment ref={myAppointmentComponent} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})