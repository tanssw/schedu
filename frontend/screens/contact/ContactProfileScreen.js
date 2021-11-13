import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import axios from 'axios'

import {
    AUTH_TOKEN_KEY,
    AUTH_USER_ID,
    clearAuthAsset,
    getAuthAsset,
    setAuthAsset
} from '../../modules/auth'

export default function ContactProfileScreen({ route, navigation }) {
    const { objectId } = route.params

    const [profile, updateProfile] = useState([])
    const getQueryPeople = async () => {
        const {token} = await getAuthAsset()
        const payload = { 
            headers:{
                // "schedu-uid": objectId,
                "schedu-token": token
            },
            // params:{
            //     id: objectId
            // }
        }
        const all = await axios.get(`http://localhost:3000/account/${objectId}`, payload)
        updateProfile(all.data)
    }

    useEffect(() => {
        getQueryPeople()
    }, [])

    return (
        <SafeAreaView>
            <Text>Hello, Contact Profile Screen! : {JSON.stringify(profile)}</Text>
        </SafeAreaView>
    )
}
