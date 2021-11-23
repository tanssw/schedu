import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../../modules/apis'
import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../../modules/auth'

import { text, colorCode, shadow } from '../../../styles'
import dayjs from 'dayjs'

function NotificationCard(props, ref) {
    const [notification, changeNotification] = useState({})

    const navigation = useNavigation()

    useImperativeHandle(
        ref,
        () => ({
            loadNewest() {
                loadNotification()
            }
        }),
        []
    )

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
                `${API_SERVER_DOMAIN}/notification/newest`,
                payload
            )
            const newestNotification = notificationResult.data.notification
            changeNotification(newestNotification)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    const navigateToApproval = async appointmentId => {
        const { token, userId } = await getAuthAsset()
        const payload = {
            headers: {
                'Schedu-Token': token,
                'Schedu-UID': userId
            }
        }
        try {
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

    const renderRequestNotification = () => {
        const sender = `${notification.detail.sender.firstName} ${notification.detail.sender.lastName}`
        const date = dayjs(notification.detail.startAt).format('DD MMMM YYYY')
        const startAt = dayjs(notification.detail.startAt).format('HH:mm')
        const endAt = dayjs(notification.detail.endAt).format('HH:mm')
        return (
            <TouchableOpacity
                onPress={() => {
                    navigateToApproval(notification.appointmentId)
                }}
                style={[styles.notificationCard, shadow.boxBottomSmall]}
            >
                <View>
                    <Text style={[styles.notificationHeader, text.green]}>New Request</Text>
                    <View>
                        <Text style={styles.notificationDetail}>from {sender}</Text>
                        <Text style={styles.notificationDetail}>
                            {date} at {startAt} - {endAt}
                        </Text>
                    </View>
                </View>
                <Ionicons name="mail-unread-outline" size={42} color={colorCode.green} />
            </TouchableOpacity>
        )
    }

    const decisionRendering = notification => {
        if (!Object.keys(notification).length) return null
        switch (notification.type) {
            case 'request':
                return renderRequestNotification()
        }
    }

    return (
        <View style={styles.container}>
            {decisionRendering(notification)}
            <TouchableOpacity onPress={props.onAppointmentPress} style={styles.viewAppointment}>
                <Text style={text.grey}>View All Appointments</Text>
                <Entypo name="chevron-small-right" size={18} color={colorCode.grey} />
            </TouchableOpacity>
        </View>
    )
}

export default forwardRef(NotificationCard)

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    viewAppointment: {
        textAlign: 'center',
        fontWeight: '300',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 8
    },
    notificationCard: {
        borderWidth: 1,
        borderRadius: 16,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    notificationHeader: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4
    },
    notificationDetail: {
        fontSize: 12,
        fontWeight: '300',
        marginTop: 4
    }
})
