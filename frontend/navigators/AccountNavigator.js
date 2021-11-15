import React, { useState, useEffect } from 'react'
import { Button } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { headerDefaultOptions } from '../styles'
import Constants from 'expo-constants'

import AccountMenuScreen from '../screens/account/AccountMenuScreen'
import ProfileScreen from '../screens/account/ProfileScreen'
import EditProfileScreen from '../screens/account/EditProfileScreen'
import SettingScreen from '../screens/account/SettingScreen'

const AccountStack = createNativeStackNavigator()
const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function AccountNavigator({ navigation }) {
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
            // Clear stored token in Secure Store
            await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY, {})
        }
    }

    const [userData, setUserData] = useState({})

    return (
        <AccountStack.Navigator
            initialRouteName="AccountMenuScreen"
            screenOptions={headerDefaultOptions}
        >
            <AccountStack.Screen
                name="AccountMenuScreen"
                component={AccountMenuScreen}
                options={{ headerTitle: 'Account' }}
            />
            <AccountStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerRight: () => (
                        <Button
                            onPress={() => {
                                navigation.navigate('EditProfile', userData)
                            }}
                            title="edit"
                        />
                    )
                }}
            />
            <AccountStack.Screen name="EditProfile" component={EditProfileScreen} />
            <AccountStack.Screen name="Setting" component={SettingScreen} />
        </AccountStack.Navigator>
    )
}
