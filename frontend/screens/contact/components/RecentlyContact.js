import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { checkExpiredToken, clearAuthAsset } from '../../../modules/auth'

import { colorCode } from '../../../styles'
import axios from 'axios'

function RecentlyContact(props, ref) {

    const [recentlyContacts, updateRecentlyContacts] = useState([])

    const navigation = useNavigation()

    useImperativeHandle(ref, () => ({
        loadRecentlyContacts() { loadContacts() }
    }), [])

    const loadContacts = async () => {
        try {
            const { token, userId } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token,
                    'Schedu-UID': userId
                }
            }
            const contactResult = await axios.get(`${API_SERVER_DOMAIN}/appointment/recently`, payload)
            const contacts = contactResult.data.result
            updateRecentlyContacts(contacts)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    const navigateContactProfile = (userId) => {
        navigation.navigate('ContactProfile', { contactId: userId })
    }

    const renderContacts = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {navigateContactProfile(item.userId)}} style={index ? styles.marginLeftDefault : ''}>
                <FontAwesome name="user-circle-o" size={42} color={colorCode.blue} style={styles.personImage} />
                <Text style={styles.personName}>{item.firstName} {item.lastName[0]}.</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Recently Contact</Text>
            <View style={styles.suggestionContainer}>
                <FlatList
                    horizontal
                    data={recentlyContacts}
                    renderItem={renderContacts}
                    keyExtractor={(contact, index) => index}
                />
            </View>
        </View>
    )
}

export default forwardRef(RecentlyContact)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 8
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16
    },
    suggestionContainer: {
        flexDirection: 'row'
    },
    personName: {
        textAlign: 'center',
        marginTop: 6,
        fontWeight: '300'
    },
    personImage: {
        textAlign: 'center'
    },
    marginLeftDefault: {
        marginLeft: 12
    }
})
