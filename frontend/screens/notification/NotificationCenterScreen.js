import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../modules/apis'
import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../modules/auth'
import { colorCode } from '../../styles'
import dayjs from 'dayjs'

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
        const sender = `${item.detail.sender.firstName} ${item.detail.sender.lastName}`
        const notifyTime = dayjs(item.createdAt).format('HH:mm')
        return (
            <TouchableOpacity style={styles.notificationCard}>
                <View>
                    <Ionicons name="mail-outline" size={42} color={colorCode.green} />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.headerBox}>
                        <Text style={styles.headerText}>Request</Text>
                        <Text style={styles.time}>{notifyTime}</Text>
                    </View>
                    <Text numberOfLines={2} style={styles.description}>
                        {sender} sent an appointment request to you. Check out your calendar!
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

    const renderFlatList = () => {
        return (
            <FlatList data={myNotifications} renderItem={decisionRendering} keyExtractor={item => item._id} />
        )
    }

    const renderEmpty = () => {
        return (
            <View style={styles.emptyContainer}>
                <Entypo name="notifications-off" size={96} color={colorCode.lightGrey} />
                <Text style={styles.emptyText}>You have no notifcation</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {myNotifications.length ? renderFlatList() : renderEmpty()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '300',
        marginTop: 8,
        color: colorCode.lightGrey
    },
    borderTop: {
        borderTopWidth: 0.75,
        borderTopColor: colorCode.lightGrey,
    },
    notificationCard: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        marginLeft: 16
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    time: {
        fontSize: 12,
        color: colorCode.dark
    },
    description: {
        fontWeight: '300',
        color: colorCode.dark
    }
})