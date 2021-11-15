import React from 'react'
import {} from 'react-native'
import { Calendar } from 'react-native-calendars'

import { colorCode } from '../../../styles'

const calendarTheme = {
    arrowColor: colorCode.blue,
    dayTextColor: '#444444',
    todayTextColor: 'royalblue',
    textDisabledColor: '#aaaaaa',
}

export default function ProfileCalendar() {
    return (
        <Calendar
            theme={calendarTheme}
        />
    )
}