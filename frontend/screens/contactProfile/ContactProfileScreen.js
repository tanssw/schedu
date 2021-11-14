import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import axios from 'axios'

import { getAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import { shadow } from '../../styles'

import ProfileHeader from './components/ProfileHeader'
import ProfileCalendar from './components/ProfileCalendar'

export default function ContactProfileScreen({ route, navigation }) {

    const [profileState, updateProfileState] = useState({})

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
    }

    return (
        <SafeAreaView style={styles.container}>
            <ProfileHeader profile={profileState} />
            <View style={[styles.mainContainer, shadow.boxTopMedium]}>
                <ProfileCalendar />
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
        padding: 32,
        zIndex: 2,
        backgroundColor: 'white'
    }
})
