import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/home/HomeScreen'
import ContactListScreen from '../screens/contact/ContactListScreen'
import CalendarOverviewScreen from '../screens/calendar/CalendarOverviewScreen'
import NotificiationCenterScreen from '../screens/notification/NotificationCenterScreen'
import AccountMenuScreen from '../screens/account/AccountMenuScreen'

const Tab = createBottomTabNavigator()

const options = {
    home: {},
    contact: {},
    calendar: {},
    notification: {},
    account: {}
}

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={ HomeScreen } />
                <Tab.Screen name="Contact" component={ ContactListScreen } />
                <Tab.Screen name="Calendar" component={ CalendarOverviewScreen } />
                <Tab.Screen name="Notification" component={ NotificiationCenterScreen } />
                <Tab.Screen name="Account" component={ AccountMenuScreen } />
            </Tab.Navigator>
        </NavigationContainer>
    )
}