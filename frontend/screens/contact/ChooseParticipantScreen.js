import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import axios from 'axios'

import { getAuthAsset, checkExpiredToken, clearAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import Participants from './components/Participants'

import { Feather } from '@expo/vector-icons'
import { colorCode } from '../../styles'

export default function ChooseParticipantScreen(props) {
    const [contacts, setContacts] = useState([])
    const { participants } = props.route.params

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
                if (checkExpiredToken(error)) {
                    await clearAuthAsset()
                    return navigation.navigate('SignIn')
                }
            }
        })
        return unsubscribe
    })

    const goToCreateAppointment = payload => {
        props.navigation.navigate('CreateAppointment', payload)
    }

    const renderEmptyContact = () => {
        return (
            <View style={styles.emptyContainer}>
                <Feather name="user-x" size={64} color={colorCode.grey} />
                <Text style={styles.emptyText}>Can't find what you're looking for ...</Text>
            </View>
        )
    }

    const renderContact = (contact, index) => {
        if (
            contact._id !== props.route.params.data.contactId &&
            !participants.find(item => item._id === contact._id)
        )
            return (
                <Participants
                    contact={contact}
                    key={contact._id}
                    data={props.route.params.data}
                    choose={goToCreateAppointment}
                    index={index}
                />
            )
    }
    return (
        <ScrollView contentContainerStyle={styles.contactContainer}>
            {contacts.length !== participants.length + 1
                ? contacts.map((contact, index) => renderContact(contact, index))
                : renderEmptyContact()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contactContainer: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: colorCode.grey,
        marginTop: 8
    }
})
