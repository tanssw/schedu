import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import CalendarOverview from './components/CalendarOverview'
import IncomingRequest from './components/IncomingRequest'
import MyAppointment from './components/MyAppointment'

export default function CalendarOverviewScreen() {
    return (
        <ScrollView style={styles.container}>
            <CalendarOverview />
            <IncomingRequest />
            <MyAppointment />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})