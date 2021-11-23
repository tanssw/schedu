import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Alert } from 'react-native'
import { Calendar } from 'react-native-calendars'
import dayjs from 'dayjs'

import { colorCode } from '../../../styles'
import axios from 'axios'
import { API_SERVER_DOMAIN } from '../../../modules/apis'

const calendarTheme = {
    arrowColor: colorCode.blue,
    dayTextColor: '#444444',
    todayTextColor: 'royalblue',
    textDisabledColor: '#aaaaaa'
}

function ProfileCalendar(props, ref) {
    const [eventState, updateEventState] = useState({})

    useImperativeHandle(
        ref,
        () => ({
            loadContactEvent() {
                loadEvent()
            }
        }),
        []
    )

    const loadEvent = async () => {
        try {
            const eventResult = await axios.get(`${API_SERVER_DOMAIN}/event/`)
            const events = eventResult.data.events
            updateEventState(buildEventDateMarks(events))
        } catch (error) {
            updateEventState({})
        }
    }

    // To build an event object of MarkedDate to show in Calendar
    const buildEventDateMarks = (events, object = {}) => {
        events.forEach(event => {
            if (!event.date) return
            let date = dayjs(event.date).format('YYYY-MM-DD')
            let included = Object.keys(object).includes(date)
            if (!included) object[date] = { marked: true, dotColor: colorCode.grey }
        })
        return object
    }

    const getMinDate = () => {
        return dayjs().format('YYYY-MM-DD')
    }

    const getMaxDate = () => {
        return dayjs().add(2, 'week').format('YYYY-MM-DD')
    }

    const dayPressHandler = day => {
        const alert = () =>
            Alert.alert("Can't choose this day", 'Maybe this contact is in busy.', [
                { text: 'Close', style: 'cancel' }
            ])

        // If contact is receiving weekend
        if (props.isReceiveWeekend) return props.onDayPress(day.dateString)

        const date = dayjs(day.dateString, 'YYYY-MM-DD')
        const weekday = date.day()
        // If selected date is a weekend
        if ([0, 6].includes(weekday)) return alert()
        // If selected date has event
        if (Object.keys(eventState).includes(date.format('YYYY-MM-DD'))) return alert()

        return props.onDayPress(day.dateString)
    }

    return (
        <Calendar
            theme={calendarTheme}
            minDate={getMinDate()}
            maxDate={getMaxDate()}
            onDayPress={day => {
                dayPressHandler(day)
            }}
            markedDates={eventState}
        />
    )
}

export default forwardRef(ProfileCalendar)
