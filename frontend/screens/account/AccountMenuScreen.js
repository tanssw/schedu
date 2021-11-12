<<<<<<< HEAD
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

=======
import React from 'react'
>>>>>>> dev
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'

import { text, shadow, colorCode } from '../../styles'
import { AUTH_TOKEN_KEY, clearAuthAsset } from '../../modules/auth'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

const AUTH_TOKEN_KEY = 'authtoken'

export default function AccountMenuScreen({ navigation }) {
<<<<<<< HEAD
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
=======

    const userData = useSelector(state => state.user.userData)
>>>>>>> dev

    const signOut = async () => {
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
        try {
            const payload = {
                headers: {
                    'Schedu-Token': token
                }
            }
            const result = axios.delete(`${API_SERVER_DOMAIN}/auth`, payload)
            await clearAuthAsset()
        } catch (error) {
            const status = error.response.status
            if (status === 500) return
        }
    }

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
                <TouchableOpacity style={[styles.signOutBtn]} onPress={signOut}>
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
        fontWeight: '300',
        color: colorCode.red,
        fontSize: 16
    },
    signOutBtn: {
        width: '100%',
        padding: 16,
        borderRadius: 16,
        borderWidth: 0.75,
        borderColor: colorCode.red,
        alignItems: 'center'
    }
})
