import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ContactListScreen from '../screens/contact/ContactListScreen'
import ContactProfileScreen from '../screens/contact/ContactProfileScreen'
import ContactHistoryScreen from '../screens/contact/ContactHistoryScreen'
import ContactFavorite from '../screens/contact/ContactFavorite'
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
        <ContactStack.Navigator initialRouteName="ContactList">
            <ContactStack.Screen options={{headerShown: false}} name="ContactList" component={ContactListScreen}/>
            <ContactStack.Screen name="ContactHistory" component={ContactHistoryScreen} />
            <ContactStack.Screen name="ContactFavorite" component={ContactFavorite} />
            <ContactStack.Screen name="ContactProfile" component={ContactProfileScreen} />
            <ContactStack.Screen options={{headerShown: false}} name="CreateAppointment" component={AppointmentEditorScreen} options={options.createAppointment} />
        </ContactStack.Navigator>
    )
}