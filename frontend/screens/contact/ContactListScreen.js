import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'

import RecentlyContact from './components/RecentlyContact'
import SearchBar from './components/SearchTab'

import QueryBar from './components/QueryBar'
import ContactTab from './components/ContactTab'

import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

export default function ContactListScreen({ navigation }) {

    const [contacts, updateContacts] = useState([])

    const [shownRecently, updateShownRecently] = useState(true)
    const [shownQuery, updateShownQuery] = useState(true)

    const recentlyRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getContactUsers()
            if (shownRecently) recentlyRef.current.loadRecentlyContacts()
        })
        return unsubscribe
    })

    const getSearch = async (text) => {
        try {
            const { token, userId } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token,
                    'Schedu-UID': userId
                },
                params: {
                    word: text
                }
            }
            const userResult = await axios.get(`${API_SERVER_DOMAIN}/account/search`, payload)
            const users = userResult.data.result
            updateContacts(users)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    // Query all users in the system
    const getContactUsers = async (role=null) => {
        try {
            const { token, userId } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token,
                    'Schedu-UID': userId
                },
                params: {
                    role: role
                }
            }
            const userResult = await axios.get(`${API_SERVER_DOMAIN}/account/all`, payload)
            const contactUsers = userResult.data.users
            updateContacts(contactUsers)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
        }
    }

    const reactToSearch = async (text) => {
        if (text) getSearch(text)
        else getContactUsers()
        updateShownRecently(!text)
        updateShownQuery(!text)
    }

    return (
        <View style={styles.container}>
            <SearchBar searchWord={reactToSearch} />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    {shownRecently ? <RecentlyContact ref={recentlyRef} /> : null}
                    {shownQuery ? <QueryBar onSelect={getContactUsers} /> : null}
                    <ContactTab contacts={contacts} headerText="Contact" />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1
    }
})
