import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'

import { colorCode } from '../../../styles'

const calendarTheme = {
    arrowColor: colorCode.blue,
    dayTextColor: '#444444',
    todayTextColor: 'royalblue',
    textDisabledColor: '#aaaaaa',
}

export default function CalendarOverview(props) {
    return (
        <View style={styles.container}>
            <Calendar
                theme={calendarTheme}
                onDayPress={(day) => {
                    props.onDateSelect(day)
                }}
                markedDates={props.markedDates}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16
    }
})