import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import axios from 'axios'

import { getAuthAsset, checkExpiredToken } from '../../modules/auth'

export default function ContactHistoryScreen({ route, navigation }) {
    const [participants, updateParticipants] = useState([])

    const getQueryHistory = async () => {
        const { token, userId } = await getAuthAsset()
        const test = '617ace4e233ec5b2b2570d4f'
        const payload = {
            headers: {
                'schedu-token': token,
                'schedu-uid': userId
            }
        }
        try {
            const historyLog = await axios.get(`http://localhost:3000/appointment/`, { params: { id: userId } }, payload)
            updateParticipants(historyLog.data)
        } catch (error) {
            if (checkExpiredToken(error)) navigation.navigate('SignIn')
        }
    }
    useEffect(() => {
        getQueryHistory()
    }, [])

    return (
        <View style={styles.ContactTab}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>History</Text>
            <View style={styles.listContainer}>
                {participants.map(({ _id, firstName, lastName, role }, index) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ContactProfile', { objectId: _id })
                        }}
                        key={`${_id + index}`}
                    >
                        <View style={styles.listItem}>
                            <FontAwesome
                                name="user-circle-o"
                                size={44}
                                color="grey"
                                style={styles.personImage}
                            />
                            <View>
                                <Text style={[styles.personName, (styles.flex = 1)]}>
                                    {firstName} {lastName}
                                </Text>
                                <Text style={[styles.personRole]}>{role}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    participantContainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 20
    },
    personName: {
        textAlign: 'center',
        marginTop: 4
    },
    personRole: {
        textAlign: 'left'
    },
    personImage: {
        textAlign: 'center',
        marginVertical: 3,
        marginHorizontal: 20
    },
    ContactTab: {
        padding: 16
    },
    listContainer: {
        marginTop: 15,
        marginBottom: 20
    },
    listItem: {
        flexDirection: 'row',
        margin: 5,
        marginBottom: 15,
        alignSelf: 'flex-start'
    }
})
