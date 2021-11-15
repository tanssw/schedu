import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { headerDefaultOptions } from '../styles'

import ContactListScreen from '../screens/contact/ContactListScreen'
import ContactHistoryScreen from '../screens/contact/ContactHistoryScreen'
import ContactFavorite from '../screens/contact/ContactFavorite'
import AppointmentEditorScreen from '../screens/appointment/AppointmentEditorScreen'
import ContactProfileScreen from '../screens/contactProfile/ContactProfileScreen'

const ContactStack = createNativeStackNavigator()

const options = {
    contactList: {
        headerShown: false
    },
    createAppointment: {
        headerTitle: 'Appointment',
        headerShown: false
    },
    contactProfile: {
        title: '',
        headerBackTitle: 'Contact'
    }
}
export default function ContactNavigator() {
    return (
        <ContactStack.Navigator initialRouteName="ContactList" screenOptions={headerDefaultOptions}>
            <ContactStack.Screen name="ContactList" component={ContactListScreen} options={options.contactList}/>
            <ContactStack.Screen name="ContactHistory" component={ContactHistoryScreen} />
            <ContactStack.Screen name="ContactFavorite" component={ContactFavorite} />
            <ContactStack.Screen name="ContactProfile" component={ContactProfileScreen} options={options.contactProfile} />
            <ContactStack.Screen name="CreateAppointment" component={AppointmentEditorScreen} options={options.createAppointment} />
        </ContactStack.Navigator>
    )
}
