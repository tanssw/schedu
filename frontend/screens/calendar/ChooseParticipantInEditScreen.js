import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'

import { getAuthAsset, checkExpiredToken, clearAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import Participants from './components/Participants'

export default function ChooseParticipantScreen({route, navigation}) {
    const [contacts, setContacts] = useState([])

    const { participants, appointId } = route.params
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
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
        navigation.navigate('EditAppointmentScreen', {data: payload.data, participants:[...participants, payload.participant]})
    }

    const renderContact = contact => {
        if (!participants.find(item => item.userId === contact._id))
            return (
                <Participants contact={contact} key={contact._id} choose={goToCreateAppointment} appointId={appointId} />
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
