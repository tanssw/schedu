import React, { useState, useEffect } from "react"
import { Button } from "react-native"

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import AccountMenuScreen from "../screens/account/AccountMenuScreen"
import ProfileScreen from "../screens/account/ProfileScreen"
import EditProfileScreen from "../screens/account/EditProfileScreen"
import SettingScreen from "../screens/account/SettingScreen"

const AccountStack = createNativeStackNavigator()

export default function AccountNavigator({ navigation }) {

    return (
        <AccountStack.Navigator initialRouteName="AccountMenuScreen">
            <AccountStack.Screen
                name="AccountMenuScreen"
                component={AccountMenuScreen}
                options={{ headerTitle: "Account" }}
            />
            <AccountStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerRight: () => (
                        <Button
                            onPress={() => {
                                navigation.navigate("EditProfile")
                            }}
                            title="edit"
                        />
                    ),
                }}
            />
            <AccountStack.Screen
                name="EditProfile"
                component={EditProfileScreen}
            />
            <AccountStack.Screen name="Setting" component={SettingScreen} />
        </AccountStack.Navigator>
    )
}
