import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import axios from 'axios'

import { getAuthAsset } from '../../modules/auth'

export default function ContactProfileScreen({ route, navigation }) {

    const [profile, updateProfile] = useState([])

    const { objectId } = route.params

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = async () => {
        const { token } = await getAuthAsset()
        const payload = {
            headers: {
                "Schedu-Token": token
            }
        }
        const all = await axios.get(`http://localhost:3000/account/${objectId}`, payload)
        updateProfile(all.data)
    }


    return (
        <SafeAreaView>
            <Text>Hello, Contact Profile Screen! : {JSON.stringify(profile)}</Text>
        </SafeAreaView>
    )
}
