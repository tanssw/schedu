import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from '../screens/account/SignInScreen'
import MainNavigator from './MainNavigator'

const AuthStack = createNativeStackNavigator()

export default function AuthNavigator() {
    return (
        <NavigationContainer>
            <AuthStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <AuthStack.Screen name="SignIn" component={SignInScreen} />
                <AuthStack.Screen name="MainNavigator" component={MainNavigator} />
            </AuthStack.Navigator>
        </NavigationContainer>
    )
}