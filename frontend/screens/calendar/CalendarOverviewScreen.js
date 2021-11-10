import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import dayjs from 'dayjs'

import CalendarOverview from './components/CalendarOverview'
import IncomingRequest from './components/IncomingRequest'
import MyAppointment from './components/MyAppointment'

export default function CalendarOverviewScreen({navigation}) {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Calendar Overview is loaded.')
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
            <MyAppointment />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})