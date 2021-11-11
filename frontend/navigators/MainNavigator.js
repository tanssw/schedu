import React, { useEffect } from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons"

import HomeScreen from "../screens/home/HomeScreen"
import CalendarOverviewScreen from "../screens/calendar/CalendarOverviewScreen"
import NotificiationCenterScreen from "../screens/notification/NotificationCenterScreen"
import AccountMenuScreen from "../screens/account/AccountMenuScreen"

import ContactNavigator from "./ContactNavigator"
import CalendarNavigator from "./CalendarNavigator"
import AccountNavigator from "./AccountNavigator"

// Redux
import { useDispatch } from "react-redux"
import { signIn } from "../store/actions/userAction"

const Tab = createBottomTabNavigator()

const options = {
    navigator: {
        tabBarActiveTintColor: "royalblue",
    },
    home: {
        headerTitle: "Schedu",
        tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
        ),
    },
    contact: {
        headerTitle: "Contacts",
        tabBarIcon: ({ size, color }) => (
            <AntDesign name="contacts" size={size} color={color} />
        ),
        headerShown: false,
    },
    calendar: {
        headerTitle: "My Calendar",
        tabBarIcon: ({ size, color }) => (
            <AntDesign name="calendar" size={size} color={color} />
        ),
        headerShown: false,
    },
    notification: {
        headerTitle: "Notification Center",
        tabBarIcon: ({ size, color }) => (
            <Feather name="bell" size={size} color={color} />
        ),
    },
    account: {
        headerTitle: "Account",
        tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
        ),
        headerShown: false,
    },
}

export default function MainNavigator(props) {
    // const signInHandler = () => {
    //     dispatch(signIn(props.userData));
    // };

    /*
     *  ใช้ตอน Sign In
     */
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(signIn(props.userData));
    // });

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => options.navigator}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={options.home}
                />
                <Tab.Screen
                    name="Contact"
                    component={ContactNavigator}
                    options={options.contact}
                />
                <Tab.Screen
                    name="Calendar"
                    component={CalendarNavigator}
                    options={options.calendar}
                />
                <Tab.Screen
                    name="Notification"
                    component={NotificiationCenterScreen}
                    options={options.notification}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountNavigator}
                    options={options.account}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
