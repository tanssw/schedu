import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/home/HomeScreen'

const Tab = createBottomTabNavigator()

export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={ HomeScreen } />
                <Tab.Screen name="Contact" component={ HomeScreen } />
                <Tab.Screen name="Calendar" component={ HomeScreen } />
                <Tab.Screen name="Notification" component={ HomeScreen } />
                <Tab.Screen name="Account" component={ HomeScreen } />
            </Tab.Navigator>
        </NavigationContainer>
    )
}