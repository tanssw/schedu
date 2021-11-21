import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../modules/apis'
import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../modules/auth'
import { colorCode } from '../../styles'

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

    const renderRequestNotification = (item, index) => {
        return (
            <TouchableOpacity style={styles.notificationCard}>
                <View>
                    <Text style={styles.headerText}>Request</Text>
                    <Text style={styles.description}>
                        {item.detail.sender}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    // To make an decision on rendering notification card depends on type of notification
    const decisionRendering = ({item, index}) => {
        switch (item.type) {
            case 'request': return renderRequestNotification(item, index)
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={myNotifications}
                renderItem={decisionRendering}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    borderTop: {
        borderTopWidth: 0.75,
        borderTopColor: colorCode.lightGrey
    },
    notificationCard: {
        padding: 16
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: colorCode.dark
    },
    description: {
        fontWeight: '300',
        color: colorCode.grey
    }
})