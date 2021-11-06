import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

import axios from 'axios'

import TimeSelector from './components/TimeSelector'
import AppointmentDetail from './components/AppointmentDetail'

export default function AppointmentEditorScreen() {

    const createAppointmentHandler = (data) => {
        console.log(data)
    }

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <TimeSelector />
                <AppointmentDetail onCreateAppointment={createAppointmentHandler} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})