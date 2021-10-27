import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons"

import HomeScreen from '../screens/home/HomeScreen'
import ContactListScreen from '../screens/contact/ContactListScreen'
import CalendarOverviewScreen from '../screens/calendar/CalendarOverviewScreen'
import NotificiationCenterScreen from '../screens/notification/NotificationCenterScreen'
import AccountMenuScreen from '../screens/account/AccountMenuScreen'

const Tab = createBottomTabNavigator()

const options = {
    navigator: {
        tabBarActiveTintColor: 'royalblue'
    },
    home: {
        headerTitle: 'Schedu',
        tabBarIcon: ({size, color}) => (<AntDesign name="home" size={size} color={color} />)
    },
    contact: {
        headerTitle: 'Contacts',
        tabBarIcon: ({size, color}) => (<AntDesign name="contacts" size={size} color={color} />)
    },
    calendar: {
        headerTitle: 'My Calendar',
        tabBarIcon: ({size, color}) => (<AntDesign name="calendar" size={size} color={color} />)
    },
    notification: {
        headerTitle: 'Notification Center',
        tabBarIcon: ({size, color}) => (<Feather name="bell" size={size} color={color} />)
    },
    account: {
        headerTitle: 'Account',
        tabBarIcon: ({size, color}) => (<Ionicons name="person-circle-outline" size={size} color={color} />)
    }
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({route}) => (options.navigator)}>
                <Tab.Screen name="Home" component={HomeScreen} options={options.home} />
                <Tab.Screen name="Contact" component={ContactListScreen} options={options.contact} />
                <Tab.Screen name="Calendar" component={CalendarOverviewScreen} options={options.calendar} />
                <Tab.Screen name="Notification" component={NotificiationCenterScreen} options={options.notification} />
                <Tab.Screen name="Account" component={AccountMenuScreen} options={options.account} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}