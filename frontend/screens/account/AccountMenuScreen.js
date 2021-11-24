import React from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import axios from 'axios'

import { clearAuthAsset, getAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import { text, shadow, colorCode } from '../../styles'

export default function AccountMenuScreen({ navigation, userData }) {

    const signOut = async () => {
        try {
            const { token } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token
                }
            }
            const result = axios.delete(`${API_SERVER_DOMAIN}/auth`, payload)
        } finally {
            await clearAuthAsset()
            return navigation.navigate('SignIn')
        }
    }

    const signOutRequest = () => (
        Alert.alert(
            'Are you sure?',
            'You can always signing back in with your ITKMITL account.',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Sign Out', style: 'destructive', onPress: () => {signOut()}}
            ]
        )
    )

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={{ url: userData.image }} />
                <Text style={[styles.userFullname, text.blue]}>
                    {userData.firstName + ' ' + userData.lastName}
                </Text>
                <Text style={styles.userRole}>{userData.role}</Text>
            </View>
            <View style={[styles.menuContainer, shadow.boxTopMedium]}>
                <View>
                    <Text style={styles.menuHeader}>My Account</Text>
                    <TouchableOpacity
                        style={[styles.menuBtn, {borderTopWidth: 0.75}]}
                        onPress={() => navigation.navigate('Profile', userData)}
                    >
                        <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuBtn}
                        onPress={() => navigation.navigate('Setting', userData.setting)}
                    >
                        <Text style={styles.menuText}>Settings</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signOutBtnContainer}>
                    <TouchableOpacity style={[styles.signOutBtn]} onPress={signOutRequest}>
                        <Text style={styles.signOutBtnText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center'
    },
    profileContainer: {
        padding: 16,
        marginVertical: 24,
        alignItems: 'center'
    },
    menuContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 32,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 512,
    },
    userFullname: {
        fontWeight: '300',
        fontSize: 16,
        marginTop: 16
    },
    userRole: {
        marginTop: 4,
        color: colorCode.grey,
        fontWeight: '300'
    },
    menuHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorCode.blue,
        marginBottom: 12,
        paddingHorizontal: 24
    },
    menuBtn: {
        borderBottomWidth: 0.75,
        borderColor: colorCode.lighterGrey,
        paddingVertical: 16,
        paddingHorizontal: 24
    },
    menuText: {
        fontWeight: '300',
        fontSize: 14,
        color: colorCode.dark
    },
    signOutBtnContainer: {
        padding: 24
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
