import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AccountMenuScreen from '../screens/account/AccountMenuScreen'
import ProfileScreen from '../screens/account/ProfileScreen'
import EditProfileScreen from '../screens/account/EditProfileScreen'
import SettingScreen from '../screens/account/SettingScreen'

const AccountStack = createNativeStackNavigator()

export default function AccountNavigator() {
    return (
        <AccountStack.Navigator initialRouteName="AccountMenu">
            <AccountStack.Screen name="AccountMenu" component={AccountMenuScreen} />
            <AccountStack.Screen name="Profile" component={ProfileScreen} />
            <AccountStack.Screen name="EditProfile" component={EditProfileScreen} />
            <AccountStack.Screen name="Setting" component={SettingScreen} />
        </AccountStack.Navigator>
    )
}