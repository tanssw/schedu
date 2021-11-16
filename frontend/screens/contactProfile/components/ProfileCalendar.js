import React from 'react'
import {} from 'react-native'
import { Calendar } from 'react-native-calendars'
import dayjs from 'dayjs'

import { colorCode } from '../../../styles'

const calendarTheme = {
    arrowColor: colorCode.blue,
    dayTextColor: '#444444',
    todayTextColor: 'royalblue',
    textDisabledColor: '#aaaaaa'
}

export default function ProfileCalendar(props) {

    const getMinDate = () => {
        return dayjs().format('YYYY-MM-DD')
    }

    const getMaxDate = () => {
        return dayjs().add(2, 'week').format('YYYY-MM-DD')
    }

    return (
        <Calendar
            theme={calendarTheme}
            minDate={getMinDate()}
            maxDate={getMaxDate()}
            onDayPress={(day) => {props.onDayPress(day.dateString)}}
        />
    )
}