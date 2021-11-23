import React, { useState } from 'react'
import { Button } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { headerDefaultOptions } from '../styles'

import CalendarOverviewScreen from '../screens/calendar/CalendarOverviewScreen'
import CalendarDetailScreen from '../screens/calendar/CalendarDetailScreen'
import AppointmentScreen from '../screens/appointment/AppointmentScreen'
import AppointmentApprovalScreen from '../screens/appointment/AppointmentApprovalScreen'
import AppointmentEditorScreen from '../screens/calendar/AppointmentEdiitorScreen'
import ChooseParticipantScreen from '../screens/calendar/ChooseParticipantInEditScreen'

const CalendarStack = createNativeStackNavigator()

export default function CalendarNavigator({ navigation }) {
    const [appointmentId, setAppointmentId] = useState('')
    const getAppointmentId = test => {
        return setAppointmentId(test)
    }
    return (
        <CalendarStack.Navigator
            initialRouteName="CalendarOverview"
            screenOptions={headerDefaultOptions}
        >
            <CalendarStack.Screen
                name="CalendarOverview"
                options={{
                    headerTitle: 'Calendar'
                }}
            >
                {props => <CalendarOverviewScreen {...props} getAppointmentId={getAppointmentId} />}
            </CalendarStack.Screen>
            <CalendarStack.Screen
                name="CalendarDetail"
                component={CalendarDetailScreen}
                options={({ route }) => ({
                    headerTitle: route.params.title
                })}
            />
            <CalendarStack.Screen
                name="Appointment"
                component={AppointmentScreen}
                options={{
                    headerRight: () => (
                        <Button
                            onPress={() => {
                                navigation.navigate('AppointmentEditorScreen', {
                                    data: appointmentId,
                                    participants: []
                                })
                            }}
                            title="Edit"
                            color="white"
                        />
                    )
                }}
            ></CalendarStack.Screen>
            <CalendarStack.Screen
                name="AppointmentApproval"
                component={AppointmentApprovalScreen}
                options={{ headerTitle: 'Approval' }}
            />
            <CalendarStack.Screen
                name="AppointmentEditorScreen"
                component={AppointmentEditorScreen}
                options={{ headerTitle: 'Edit Appointment' }}
            ></CalendarStack.Screen>
            <CalendarStack.Screen
                name="ChooseParticipants"
                component={ChooseParticipantScreen}
                options={{ headerTitle: 'Choose Participant' }}
            ></CalendarStack.Screen>
        </CalendarStack.Navigator>
    )
}
