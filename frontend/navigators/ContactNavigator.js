import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ContactListScreen from '../screens/contact/ContactListScreen'
import ContactProfileScreen from '../screens/contact/ContactProfileScreen'
import AppointmentApprovalScreen from '../screens/appointment/AppointmentApprovalScreen'

const ContactStack = createNativeStackNavigator()

export default function ContactNavigator() {
    return (
        <ContactStack.Navigator initialRouteName="ContactList">
            <ContactStack.Screen name="ContactList" component={ContactListScreen} />
            <ContactStack.Screen name="ContactProfile" component={ContactProfileScreen} />
            <ContactStack.Screen name="RequestApproval" component={AppointmentApprovalScreen} />
        </ContactStack.Navigator>
    )
}