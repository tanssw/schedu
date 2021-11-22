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
    const [appointmentId, setAppointmentId] = useState("")
    const [appointment, setAppointment] = useState({})
    const [senderId, setSenderId] = useState()
    const getAppointmentId = (id) =>{
        return setAppointmentId(id)
    }
    const getAppointment = (appointment) => {
        return setAppointment(appointment)
    }
    const senderAccess = (id) =>{
        setSenderId(appointment.sender)
        return senderId === id ? true : false
    }
    const receiverAccess = (id) => {
        const receiver = appointment.participants.filter(participant => participant.main === true)
        return receiver[0].userId === id ? true : false
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
            {props => <CalendarOverviewScreen {...props} getAppointmentId={getAppointmentId} getAppointment={getAppointment}/>}

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
                                navigation.navigate('EditAppointmentScreen', {id: appointmentId, appointment: appointment})}}
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
