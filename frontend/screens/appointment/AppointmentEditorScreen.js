import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

import TimeSelector from './components/TimeSelector'
import AppointmentDetail from './components/AppointmentDetail'

export default function AppointmentEditorScreen() {
    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <TimeSelector />
                <AppointmentDetail />
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