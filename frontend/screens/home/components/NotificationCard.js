import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../../modules/apis'
import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../../modules/auth'

import { text, colorCode, shadow } from '../../../styles'

function NotificationCard(props, ref) {

    const [notification, changeNotification] = useState({})

    const navigation = useNavigation()

    useImperativeHandle(ref, () => ({
        loadNewest() { loadNotification() }
    }), [])

    const loadNotification = async () => {
        try {
            const { token, userId } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token,
                    'Schedu-UID': userId
                }
            }
            const notificationResult = await axios.get(`${API_SERVER_DOMAIN}/notification/newest`, payload)
            const newestNotification = notificationResult.data.notification
            changeNotification(newestNotification)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.notificationCard, shadow.boxBottomSmall]}>
                <View>
                    <Text style={[styles.notificationHeader, text.green]}>New Request</Text>
                    <View>
                        <Text style={styles.notificationDetail}>from Tasanai Srisawat</Text>
                        <Text style={styles.notificationDetail}>07 November 2021 at 15:00 - 15:15</Text>
                    </View>
                </View>
                <Ionicons name="mail-unread-outline" size={42} color={colorCode.green} />
            </TouchableOpacity>
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