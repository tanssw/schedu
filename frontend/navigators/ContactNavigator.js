import React from 'react'
import { Button } from 'react-native'
import dayjs from 'dayjs'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { headerDefaultOptions } from '../styles'

import ContactListScreen from '../screens/contact/ContactListScreen'
import ChooseParticipantScreen from '../screens/contact/ChooseParticipantScreen'
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
export default function ContactNavigator({ navigation }) {
    return (
        <ContactStack.Navigator initialRouteName="ContactList" screenOptions={headerDefaultOptions}>
            <ContactStack.Screen
                name="ContactList"
                component={ContactListScreen}
                options={options.contactList}
            />
            <ContactStack.Screen
                name="ContactProfile"
                component={ContactProfileScreen}
                options={options.contactProfile}
            />
            <ContactStack.Screen
                name="CreateAppointment"
                component={AppointmentEditorScreen}
                options={options.createAppointment}
            />
            <ContactStack.Screen
                name="ChooseParticipants"
                component={ChooseParticipantScreen}
                options={options.chooseParticipantScreen}
            />
        </ContactStack.Navigator>
    )
}
