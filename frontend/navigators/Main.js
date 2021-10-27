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
    home: {
        tabBarIcon: ({size, color}) => {
            return <AntDesign name="home" size={size} color={color} />
        }
    },
    contact: {
        tabBarIcon: ({size, color}) => {
            return <AntDesign name="contacts" size={size} color={color} />
        }
    },
    calendar: {
        tabBarIcon: ({size, color}) => {
            return <AntDesign name="calendar" size={size} color={color} />
        }
    },
    notification: {
        tabBarIcon: ({size, color}) => {
            return <Feather name="bell" size={size} color={color} />
        }
    },
    account: {
        tabBarIcon: ({size, color}) => {
            return <Ionicons name="person-circle-outline" size={size} color={color} />
        }
    }
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} options={options.home} />
                <Tab.Screen name="Contact" component={ContactListScreen} options={options.contact} />
                <Tab.Screen name="Calendar" component={CalendarOverviewScreen} options={options.calendar} />
                <Tab.Screen name="Notification" component={NotificiationCenterScreen} options={options.notification} />
                <Tab.Screen name="Account" component={AccountMenuScreen} options={options.account} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}