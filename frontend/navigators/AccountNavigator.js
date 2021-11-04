import React, { useState } from "react";
import { Button } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountMenuScreen from "../screens/account/AccountMenuScreen";
import ProfileScreen from "../screens/account/ProfileScreen";
import EditProfileScreen from "../screens/account/EditProfileScreen";
import SettingScreen from "../screens/account/SettingScreen";

const AccountStack = createNativeStackNavigator();

export default function AccountNavigator({ route, navigation }) {
    const [editState, setEditState] = useState(false);
    // let state = { editState: false }
    return (
        <AccountStack.Navigator initialRouteName="AccountMenu">
            <AccountStack.Screen name="Account" component={AccountMenuScreen} />
            <AccountStack.Screen
                name="Profile"
                component={ProfileScreen}
                initialParams={{editState}}
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
    );
}
