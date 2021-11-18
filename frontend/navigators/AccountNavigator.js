import React, { useState, useEffect } from 'react'
import { Button } from 'react-native'
import axios from 'axios'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { clearAuthAsset, getAuthAsset } from '../modules/auth'
import { API_SERVER_DOMAIN } from '../modules/apis'

import { headerDefaultOptions } from '../styles'

import AccountMenuScreen from '../screens/account/AccountMenuScreen'
import ProfileScreen from '../screens/account/ProfileScreen'
import EditProfileScreen from '../screens/account/EditProfileScreen'
import SettingScreen from '../screens/account/SettingScreen'

const AccountStack = createNativeStackNavigator()

export default function AccountNavigator({ navigation }) {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUser()
        })
        return unsubscribe
    })

    const getUser = async () => {
        const { token, userId } = await getAuthAsset()

        const payload = { headers: { 'Schedu-Token': token } }

        try {
            const user = await axios.get(`${API_SERVER_DOMAIN}/account/${userId}`, payload)
            setUserData(user.data.user)
        } catch (error) {
            await clearAuthAsset()
            navigation.navigate('SignIn')
        }
    }

    const updateUserData = (newUserData) => {
        setUserData(newUserData)
    }

    return (
        <AccountStack.Navigator
            initialRouteName="AccountMenuScreen"
            screenOptions={headerDefaultOptions}
        >
            <AccountStack.Screen name="AccountMenuScreen" options={{ headerTitle: 'Account' }}>
                {props => <AccountMenuScreen {...props} userData={userData} />}
            </AccountStack.Screen>
            <AccountStack.Screen
                name="Profile"
                options={{
                    headerRight: () => (
                        <Button onPress={() => {navigation.navigate('EditProfile', userData)}} title="Edit" color="white" />
                    )
                }}
            >
                {props => <ProfileScreen {...props} userData={userData} />}
            </AccountStack.Screen>
            <AccountStack.Screen name="EditProfile" options={{ headerTitle: 'Edit Profile' }}>
                {props => <EditProfileScreen {...props} userData={userData} onProfileUpdated={updateUserData} />}
            </AccountStack.Screen>
            <AccountStack.Screen name="Setting" component={SettingScreen} />
        </AccountStack.Navigator>
    )
}
