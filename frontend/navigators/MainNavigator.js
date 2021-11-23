import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons'

import HomeScreen from '../screens/home/HomeScreen'
import NotificiationCenterScreen from '../screens/notification/NotificationCenterScreen'

import ContactNavigator from './ContactNavigator'
import CalendarNavigator from './CalendarNavigator'
import AccountNavigator from './AccountNavigator'
import { headerDefaultOptions } from '../styles'

const Tab = createBottomTabNavigator()

const options = {
    navigator: {
        ...headerDefaultOptions,
        tabBarActiveTintColor: 'royalblue'
    },
    home: {
        headerTitle: 'Schedu',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
        },
        tabBarIcon: ({ size, color }) => <AntDesign name="home" size={size} color={color} />
    },
    contact: {
        headerTitle: 'Contacts',
        tabBarIcon: ({ size, color }) => <AntDesign name="contacts" size={size} color={color} />,
        headerShown: false
    },
    calendar: {
        headerTitle: 'My Calendar',
        tabBarIcon: ({ size, color }) => <AntDesign name="calendar" size={size} color={color} />,
        headerShown: false
    },
    notification: {
        headerTitle: 'Notification Center',
        tabBarIcon: ({ size, color }) => <Feather name="bell" size={size} color={color} />
    },
    account: {
        headerTitle: 'Account',
        tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
        ),
        headerShown: false
    }
}

export default function MainNavigator() {
    return (
        <Tab.Navigator screenOptions={() => options.navigator}>
            <Tab.Screen name="Home" component={HomeScreen} options={options.home} />
            <Tab.Screen name="Contact" component={ContactNavigator} options={options.contact} />
            <Tab.Screen name="Calendar" component={CalendarNavigator} options={options.calendar} />
            <Tab.Screen
                name="Notification"
                component={NotificiationCenterScreen}
                options={options.notification}
            />
            <Tab.Screen name="Account" component={AccountNavigator} options={options.account} />
        </Tab.Navigator>
    )
}
