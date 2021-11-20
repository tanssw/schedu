import React from 'react'
import dayjs from 'dayjs'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { headerDefaultOptions } from '../styles'

import ContactListScreen from '../screens/contact/ContactListScreen'
import AppointmentEditorScreen from '../screens/appointment/AppointmentEditorScreen'

import ContactProfileScreen from '../screens/contactProfile/ContactProfileScreen'


const ContactStack = createNativeStackNavigator()

const options = {
    contactList: {
        headerShown: false
    },
    createAppointment: ({ route }) => ({
        headerTitle: dayjs(route.params.date).format('DD MMMM YYYY')
    }),
    contactProfile: {
        title: '',
        headerBackTitle: 'Contact',

    }
}
export default function ContactNavigator() {
    return (

        <ContactStack.Navigator initialRouteName="ContactList" screenOptions={headerDefaultOptions}>
            <ContactStack.Screen name="ContactList" component={ContactListScreen} options={options.contactList}/>
            <ContactStack.Screen name="ContactProfile" component={ContactProfileScreen} options={options.contactProfile} />
            <ContactStack.Screen name="CreateAppointment" component={AppointmentEditorScreen} options={options.createAppointment} />
        </ContactStack.Navigator>
    )
}
