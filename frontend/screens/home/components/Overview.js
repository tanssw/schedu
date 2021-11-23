import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import axios from 'axios'

import { getAuthAsset, checkExpiredToken, clearAuthAsset } from '../../../modules/auth'
import { API_SERVER_DOMAIN } from '../../../modules/apis'

import { colorCode } from '../../../styles'

function Overview(props, ref) {
    const [appointmentCount, updateAppointmentCount] = useState(0)
    const [requestCount, updateRequestCount] = useState(0)

    const navigation = useNavigation()

    useImperativeHandle(
        ref,
        () => ({
            loadOverview() {
                loadCounter()
            }
        }),
        []
    )

    const loadCounter = async () => {
        const { token, userId } = await getAuthAsset()
        const payload = {
            headers: {
                'Schedu-Token': token,
                'Schedu-UID': userId
            }
        }
        try {
            const counterResult = await axios.get(`${API_SERVER_DOMAIN}/appointment/count`, payload)
            let counts = counterResult.data
            updateAppointmentCount(counts.ongoing)
            updateRequestCount(counts.request)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.titleLine}>
                    <Text style={styles.title}>Ongoings</Text>
                    <MaterialIcons name="schedule" size={18} color={colorCode.lightBlue} />
                </View>
                <Text style={styles.counter}>{appointmentCount}</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.titleLine}>
                    <Text style={styles.title}>Requests</Text>
                    <Ionicons name="mail-outline" size={18} color={colorCode.lightBlue} />
                </View>
                <Text style={styles.counter}>{requestCount}</Text>
            </View>
        </View>
    )
}

export default forwardRef(Overview)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32
    },
    box: {
        borderWidth: 1,
        borderRadius: 16,
        borderColor: 'lightgrey',
        padding: 12,
        flex: 0.45,
        justifyContent: 'space-between'
    },
    titleLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    title: {
        fontSize: 14
    },
    counter: {
        fontSize: 24,
        color: colorCode.lightBlue
    }
})
