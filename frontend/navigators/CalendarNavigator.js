import React from 'react'
import { Button } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'


import { headerDefaultOptions } from '../styles'

import CalendarOverviewScreen from '../screens/calendar/CalendarOverviewScreen'
import CalendarDetailScreen from '../screens/calendar/CalendarDetailScreen'
import AppointmentScreen from '../screens/appointment/AppointmentScreen'
import AppointmentApprovalScreen from '../screens/appointment/AppointmentApprovalScreen'
const CalendarStack = createNativeStackNavigator()

export default function CalendarNavigator({navigation}) {
    return (
        <CalendarStack.Navigator
            initialRouteName="CalendarOverview"
            screenOptions={headerDefaultOptions}
        >
            <CalendarStack.Screen
                name="CalendarOverview"
                component={CalendarOverviewScreen}
                options={{
                    headerTitle: 'Calendar'
                }}
            />
            <CalendarStack.Screen
                name="CalendarDetail"
                component={CalendarDetailScreen}
                options={({ route }) => ({
                    headerTitle: route.params.title
                })}
            />
            <CalendarStack.Screen name="Appointment" component={AppointmentScreen}
            options={{
                headerRight: () => (
                    <Button onPress={() => {navigation.navigate('SignIn')}} title="Edit" color="white" />
                )
            }} />
            <CalendarStack.Screen
                name="AppointmentApproval"
                component={AppointmentApprovalScreen}
                options={{headerTitle: 'Approval'}}
            />
        </CalendarStack.Navigator>
    )
}
