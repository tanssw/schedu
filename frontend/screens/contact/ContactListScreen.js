import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchTab'

import QueryBar from './components/QueryBar'
import ContactTab from './components/ContactTab'

import { checkExpiredToken, getAuthAsset } from '../../modules/auth'

export default function ContactListScreen({ navigation }) {

    const [contacts, updateContacts] = useState([])

    const [headerText, updateHeaderText] = useState('Contact')
    const [search, updateSearch] = useState('')
    const [toggleSuggest, updateToggleSuggest] = useState(0)
    const [toggleQuery, updateToggleQuery] = useState(0)

    useEffect(() => {
        getContactUsers()
    }, [])

    useEffect(() => {
        if (search == '') {
            getContactUsers()
            updateToggleSuggest(0)
            updateToggleQuery(0)
        } else {
            getSearch(search)
            updateToggleSuggest(1)
            updateToggleQuery(1)
        }
    }, [search])

    const getSearch = async () => {
        const user = await axios.get(`http://localhost:3000/account/search/${search}`)
        updateContacts(user.data)
    }

    // Query all users in the system
    const getContactUsers = async (role=null) => {
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
        try {
            const userResult = await axios.get(`http://localhost:3000/account/all`, payload)
            const contactUsers = userResult.data.users
            updateContacts(contactUsers)
        } catch (error) {
            if (checkExpiredToken(error)) navigation.navigate('SignIn')
        }
    }

    const historyQuery = () => {
        updateHeaderText('History')
        closeUpper()
    }

    const StarQuery = () => {
        alert('Star')
    }

    // toggle display suggest and query bar
    const suggestDisplay = () => {
        if (toggleSuggest == 0) {
            return <SuggestBar />
        }
    }

    return (
        <View style={styles.container}>
            <SearchBar
                searchWord={updateSearch}
                historyQuery={historyQuery}
                StarQuery={StarQuery}
                find={getSearch}
            />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    {suggestDisplay()}
                    {toggleQuery ? null : <QueryBar onSelect={getContactUsers} />}
                    <ContactTab contacts={contacts} headerText={headerText} />
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
