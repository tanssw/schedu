import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../modules/apis'
import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../modules/auth'
import { colorCode } from '../../styles'
import dayjs from 'dayjs'

export default function NotificationCenterScreen({ navigation }) {
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
            const notificationResult = await axios.get(
                `${API_SERVER_DOMAIN}/notification/all`,
                payload
            )
            const notifications = notificationResult.data.notifications
            updateMyNotifications(notifications)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    const navigateToApproval = async (appointmentId, response) => {
        try {
            if (response) return
            const { token, userId } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token,
                    'Schedu-UID': userId
                }
            }
            const appointmentResult = await axios.get(
                `${API_SERVER_DOMAIN}/appointment/${appointmentId}`,
                payload
            )
            const appointment = appointmentResult.data.result
            navigation.navigate('Calendar', {
                screen: 'AppointmentApproval',
                params: { data: appointment },
                initial: false
            })
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    // Render notification for appointment request
    const renderRequestNotification = item => {
        const sender = `${item.detail.sender.firstName} ${item.detail.sender.lastName}`
        const differenceDay = dayjs(item.createdAt).day() !== dayjs().day()
        const notifyTime = dayjs(item.createdAt).format(differenceDay ? 'DD MMM' : 'HH:mm')
        return (
            <TouchableOpacity
                onPress={() => {
                    navigateToApproval(item.appointmentId, item.response)
                }}
                style={styles.notificationCard}
            >
                <View>
                    <Ionicons
                        name={item.response ? 'mail-open-outline' : 'mail-outline'}
                        size={42}
                        color={item.response ? colorCode.grey : colorCode.green}
                    />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.headerBox}>
                        <Text style={styles.headerText}>Request</Text>
                        <Text style={styles.time}>{notifyTime}</Text>
                    </View>
                    <Text numberOfLines={2} style={styles.description}>
                        {sender} sent an appointment request to you. Check it out for more detail!
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    // Render notification for appointment request
    const renderAbandonedNotification = (item, index) => {
        const notifyTime = dayjs(item.createdAt).format('HH:mm')
        return (
            <TouchableOpacity style={styles.notificationCard}>
                <View>
                    <MaterialCommunityIcons
                        name="pause-octagon-outline"
                        size={42}
                        color={colorCode.red}
                    />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.headerBox}>
                        <Text style={styles.headerText}>Abandoned</Text>
                        <Text style={styles.time}>{notifyTime}</Text>
                    </View>
                    <Text numberOfLines={2} style={styles.description}>
                        Your appointment "{item.detail.subject}" was abandoned.
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    // To make an decision on rendering notification card depends on type of notification
    const decisionRendering = ({ item, index }) => {
        switch (item.type) {
            case 'request':
                return renderRequestNotification(item, index)
            case 'abandoned':
                return renderAbandonedNotification(item, index)
        }
    }

    // Render flat list if notification is available
    const renderFlatList = () => {
        return (
            <FlatList
                data={myNotifications}
                renderItem={decisionRendering}
                keyExtractor={item => item._id}
            />
        )
    }

    // Render empty text if no notifcation
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
        fontSize: 16
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
