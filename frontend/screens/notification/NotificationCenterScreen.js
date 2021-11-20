import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../modules/apis'
import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../modules/auth'

export default function NotificationCenterScreen({navigation}) {

    const [myNotifications, updateMyNotifications] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadNotification()
        })
        return unsubscribe
    })

    const loadNotification = async () => {
        try {
            const { token, userId } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token,
                    'Schedu-UID': userId
                }
            }
            const notificationResult = await axios.get(`${API_SERVER_DOMAIN}/notification/all`, payload)
            const notifications = notificationResult.data.notifications
            updateMyNotifications(notifications)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    return (
        <Text></Text>
    )
}