import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CalendarOverview from '../screens/calendar/CalendarOverviewScreen'
import CalendarDetail from '../screens/calendar/CalendarDetailScreen'

const ContactStack = createNativeStackNavigator()

export default function CalendarNavigator() {
    return (
        <ContactStack.Navigator initialRouteName="CalendarOverview">
            <ContactStack.Screen name="CalendarOverview" component={CalendarOverview} />
            <ContactStack.Screen name="CalendarDetail" component={CalendarDetail} />
        </ContactStack.Navigator>
    )
}