import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import axios from 'axios'

import { getAuthAsset, checkExpiredToken, clearAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import Participants from './components/Participants'

import { colorCode, text } from '../../styles'

export default function ChooseParticipantScreen(props) {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            try {
                const { token, userId } = await getAuthAsset()
                const payload = {
                    headers: {
                        'Schedu-Token': token,
                        'Schedu-UID': userId
                    }
                }
                const userResult = await axios.get(`${API_SERVER_DOMAIN}/account/all`, payload)
                const contactUsers = userResult.data.users
                setContacts(contactUsers)
            } catch (error) {
                console.log(error)
                if (checkExpiredToken(error)) {
                    await clearAuthAsset()
                    return navigation.navigate('SignIn')
                }
            }
        })
        return unsubscribe
    })
    const renderContact = contact => {
        if (contact._id !== props.route.params.data.contactId) return <Participants contact={contact} key={contact._id} data={props.route.params.data} navigation={props.navigation} />
    }
    return (
        <View style={styles.contactContainer}>
            <View style={styles.listContainer}>
                {contacts.map(contact => renderContact(contact))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contactContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    },
    emptyContainer: {
        minHeight: 144,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: colorCode.grey,
        marginTop: 8
    },
    listContainer: {},
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8
    },
    personImage: {},
    personDetail: {
        flex: 1,
        marginLeft: 16
    },
    personName: {
        color: colorCode.dark
    },
    personRole: {
        fontSize: 14,
        fontWeight: '300',
        color: colorCode.grey
    }
})
