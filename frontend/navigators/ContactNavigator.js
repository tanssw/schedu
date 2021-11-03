import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ContactListScreen from '../screens/contact/ContactListScreen'
import ContactProfileScreen from '../screens/contact/ContactProfileScreen'
import AppointmentEditorScreen from '../screens/appointment/AppointmentEditorScreen'

const ContactStack = createNativeStackNavigator()

const options = {
    createAppointment: {
        headerTitle: "Appointment",

    }
}

export default function ContactNavigator() {
    return (
        // TODO: Change back initialRoute to ContactList
        <ContactStack.Navigator initialRouteName="CreateAppointment">
            <ContactStack.Screen name="ContactList" component={ContactListScreen} />
            <ContactStack.Screen name="ContactProfile" component={ContactProfileScreen} />
            <ContactStack.Screen name="CreateAppointment" component={AppointmentEditorScreen} options={options.createAppointment} />
        </ContactStack.Navigator>
    )
}