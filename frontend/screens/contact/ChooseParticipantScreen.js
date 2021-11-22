import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'

import { getAuthAsset, checkExpiredToken, clearAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import Participants from './components/Participants'

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

    const renderContact = contact => {
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
                />
            )
    }
    return (
        <ScrollView style={styles.contactContainer}>
            {contacts.map(contact => renderContact(contact))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contactContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    }
})
