import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'

import { colorCode } from '../../../styles'

const calendarTheme = {
    dayTextColor: '#444444',
    todayTextColor: colorCode.blue,
    textDisabledColor: '#aaaaaa',
    arrowColor: colorCode.blue
}

export default function CalendarOverview() {
    return (
        <View style={styles.container}>
            <Calendar theme={calendarTheme} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16
    }
})