import React, { useState } from 'react'
import { Button } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { headerDefaultOptions } from '../styles'

import CalendarOverviewScreen from '../screens/calendar/CalendarOverviewScreen'
import CalendarDetailScreen from '../screens/calendar/CalendarDetailScreen'
import AppointmentScreen from '../screens/appointment/AppointmentScreen'
import AppointmentApprovalScreen from '../screens/appointment/AppointmentApprovalScreen'
import EditAppointmentScreen from '../screens/calendar/EditorAppointmentScreen'

const CalendarStack = createNativeStackNavigator()

export default function CalendarNavigator({ navigation }) {
    const [data, setData] = useState("Test for Calendar page")
    const [appointmentId, setAppointmentId] = useState("")
    const getAppointmentId = () =>{
        alert("Test function 2")
    }
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
            <CalendarStack.Screen
                name="Appointment"
                component={AppointmentScreen}
                options={{
                    headerRight: () => (
                        <Button
                            onPress={() => {
                                navigation.navigate('EditAppointmentScreen', {data: navigation.test1234},)}}
                            title="Edit"
                            color="white"
                        />
                    )
                }}
            >
            </CalendarStack.Screen>
            <CalendarStack.Screen
                name="AppointmentApproval"
                component={AppointmentApprovalScreen}
                options={{ headerTitle: 'Approval' }}
            />
            <CalendarStack.Screen
                name="EditAppointmentScreen"
                component={EditAppointmentScreen}
                options={{ headerTitle: 'Edit Appointment' }}>
                {/* {props => <EditAppointmentScreen {...props} appointment={userData}/>} */}
            </CalendarStack.Screen>
        </CalendarStack.Navigator>
    )
}
