import React, { useEffect, useState } from 'react'

import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'

// Redux
import { useSelector } from 'react-redux'

// style by tanssw.com
import { text, shadow } from '../../styles'

const AUTH_TOKEN_KEY = 'authtoken'

export default function AccountMenuScreen({ navigation }) {
    const [userData, setUserData] = useState({
        _id: { $oid: '617be0c164389e9709ea96b0' },
        businessId: '62070077',
        firstName: 'thanakan',
        lastName: 'boonma',
        role: 'student',
        contact: { email: '62070077@it.kmitl.ac.th', tel: '0808080808' },
        image: 'https://lh3.googleusercontent.com/a/AATXAJwtwryT19EjwXDGUmiB_Y8C34GOlwfRu8S1dplb=s96-c',
        setting: {
            displayTel: true,
            weekendReceive: true,
            activeTime: { startAt: '8:30AM', endAt: '16:30AM' }
        }
    })

    // useEffect(async () => {
    //     const tokenResult = await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
    //     if (!tokenResult.token) return

    //     try {
    //         // const getUserData = await axios.post()
    //     } catch (error) {
    //         // Clear stored token in Secure Store
    //         await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY, {})
    //     }
    // })

    return (
        <View style={styles.container}>
            {/* user profile image */}
            <Image
                style={styles.profileImage}
                source={{
                    url: userData.image
                }}
            ></Image>

            {/* user fullname */}
            <Text style={[styles.userFullname, text.blue]}>
                {userData.firstName + ' ' + userData.lastName}
            </Text>

            {/* user role */}
            <Text style={styles.userRole}>{userData.role}</Text>
            <View style={[styles.userAccountNav, shadow.boxTopMedium]}>
                {/* profile navigation */}
                <View>
                    <TouchableOpacity
                        style={styles.menuBtn}
                        onPress={() => navigation.navigate('Profile', userData)}
                    >
                        <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>

                    {/* setting navigation */}
                    <TouchableOpacity
                        style={styles.menuBtn}
                        onPress={() => navigation.navigate('Setting', userData.setting)}
                    >
                        <Text style={styles.menuText}>Settings</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.signOutBtn]}
                    onPress={() => {
                        console.log('Sign out')
                    }}
                >
                    <Text style={styles.signOutBtnText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // container styles
    container: {
        flex: 1,
        paddingTop: 32,
        alignItems: 'center'
    },
    userAccountNav: {
        flex: 1,
        width: '100%',
        padding: 32,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    // image profile style
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 360,
        margin: 16
    },
    // user data styles
    userFullname: {
        fontWeight: 'bold'
    },
    userRole: {
        marginTop: 5,
        marginBottom: 40,
        color: '#AAA'
    },
    // menus styles
    menuBtn: {
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        paddingTop: 20,
        paddingBottom: 20
    },
    menuText: {
        fontWeight: 'bold'
    },
    signOutBtnText: {
        fontWeight: 'bold',
        color: 'red'
    },
    signOutBtn: {
        width: '100%',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center'
    }
})
