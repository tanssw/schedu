import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchTab'

import QueryBar from './components/QueryBar'
import ContactTab from './components/ContactTab'

import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

export default function ContactListScreen({ navigation }) {

    const [contacts, updateContacts] = useState([])

    const [search, updateSearch] = useState('')
    const [toggleSuggest, updateToggleSuggest] = useState(0)
    const [toggleQuery, updateToggleQuery] = useState(0)

    useEffect(() => {
        if (search) {
            getSearch(search)
            updateToggleSuggest(1)
            updateToggleQuery(1)
        } else {
            getContactUsers()
            updateToggleSuggest(0)
            updateToggleQuery(0)
        }
    }, [search])

    const getSearch = async () => {
        try {
            const { token, userId } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token,
                    'Schedu-UID': userId
                },
                params: {
                    word: search
                }
            }
            const user = await axios.get(`${API_SERVER_DOMAIN}/account/search`, payload)
            updateContacts(user.data)
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

    // toggle display suggest and query bar
    const suggestDisplay = () => {
        if (!toggleSuggest) {
            return <SuggestBar />
        }
    }

    return (
        <View style={styles.container}>
            <SearchBar
                searchWord={updateSearch}
                find={getSearch}
            />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    {suggestDisplay()}
                    {toggleQuery ? null : <QueryBar onSelect={getContactUsers} />}
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
