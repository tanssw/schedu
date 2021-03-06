import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../../modules/apis'
import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../../modules/auth'
import { colorCode } from '../../../styles'

function RecentlyList(props, ref) {
    const [recentlyContacts, updateRecentlyContacts] = useState([])

    const navigation = useNavigation()

    useImperativeHandle(
        ref,
        () => ({
            loadRecentlyContacts() {
                loadContacts()
            }
        }),
        []
    )

    const loadContacts = async () => {
        try {
            const { token, userId } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token,
                    'Schedu-UID': userId
                }
            }
            const contactResult = await axios.get(
                `${API_SERVER_DOMAIN}/appointment/recently`,
                payload
            )
            const contacts = contactResult.data.result
            updateRecentlyContacts(contacts)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    const navigateToProfile = userId => {
        navigation.navigate('Contact', {
            screen: 'ContactProfile',
            params: { contactId: userId },
            initial: false
        })
    }

    const renderContact = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigateToProfile(item.userId)
                }}
                style={[styles.personBox, index ? styles.contactBoxMargin : '']}
            >
                <FontAwesome
                    name="user-circle-o"
                    size={48}
                    color={colorCode.blue}
                    style={styles.personImage}
                />
                <Text numberOfLines={1} style={styles.personName}>
                    {item.firstName} {item.lastName[0]}.
                </Text>
            </TouchableOpacity>
        )
    }

    const renderFlatList = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Recently Contact</Text>
                <FlatList
                    horizontal
                    data={recentlyContacts}
                    renderItem={renderContact}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

    return <View>{recentlyContacts.length ? renderFlatList() : null}</View>
}

export default forwardRef(RecentlyList)

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 18
    },
    contactBoxMargin: {
        marginLeft: 12
    },
    personBox: {
        alignSelf: 'flex-end'
    },
    personImage: {
        textAlign: 'center',
        marginBottom: 8,
        marginHorizontal: 12
    },
    personName: {
        textAlign: 'center',
        fontWeight: '300',
        width: 64,
        alignSelf: 'center'
    }
})
