import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CalendarOverviewScreen from '../screens/calendar/CalendarOverviewScreen'
import CalendarDetailScreen from '../screens/calendar/CalendarDetailScreen'
import AppointmentScreen from '../screens/appointment/AppointmentScreen'

const CalendarStack = createNativeStackNavigator()

const options = {
    overview: {
        headerTitle: 'Calendar'
    }
}

export default function CalendarNavigator() {
    return (
        <CalendarStack.Navigator initialRouteName="CalendarOverview">
            <CalendarStack.Screen name="CalendarOverview" component={CalendarOverviewScreen} options={options.overview} />
            <CalendarStack.Screen name="CalendarDetail" component={CalendarDetailScreen} options={
                ({route}) => ({headerTitle: route.params.title})
            } />
            <CalendarStack.Screen name="Appointment" component={AppointmentScreen} />
        </CalendarStack.Navigator>
    )
}