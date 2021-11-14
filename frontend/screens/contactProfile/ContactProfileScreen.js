import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import axios from 'axios'

import { getAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import { shadow } from '../../styles'

import ProfileHeader from './components/ProfileHeader'
import ProfileCalendar from './components/ProfileCalendar'
import ProfileInformation from './components/ProfileInformation'

export default function ContactProfileScreen({ route, navigation }) {

    const [profileState, updateProfileState] = useState({})
    const [emailState, updateEmailState] = useState()
    const [phoneState, updatePhoneState] = useState()

    const { objectId } = route.params

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = async () => {
        const { token } = await getAuthAsset()
        const payload = {
            headers: {
                'Schedu-Token': token
            }
        }
        const userResult = await axios.get(`${API_SERVER_DOMAIN}/account/${objectId}`, payload)
        const user = userResult.data.user
        updateProfileState(user)
        updateEmailState(user.contact.email)
        updatePhoneState(user.contact.tel)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ProfileHeader profile={profileState} />
            <View style={[styles.mainContainer, shadow.boxTopMedium]}>
                <View style={styles.calendarContainer}>
                    <ProfileCalendar />
                </View>
                <ProfileInformation email={emailState} phone={phoneState} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        zIndex: 2,
        backgroundColor: 'white'
    },
    calendarContainer: {
        padding: 16,
        marginBottom: 24
    }
})
