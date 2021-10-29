import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CalendarOverviewScreen from '../screens/calendar/CalendarOverviewScreen'
import CalendarDetailScreen from '../screens/calendar/CalendarDetailScreen'
import AppointmentScreen from '../screens/appointment/AppointmentScreen'

const CalendarStack = createNativeStackNavigator()

export default function CalendarNavigator() {
    return (
        <CalendarStack.Navigator initialRouteName="CalendarOverview">
            <CalendarStack.Screen name="CalendarOverview" component={CalendarOverviewScreen} />
            <CalendarStack.Screen name="CalendarDetail" component={CalendarDetailScreen} />
            <CalendarStack.Screen name="Appointment" component={AppointmentScreen} />
        </CalendarStack.Navigator>
    )
}