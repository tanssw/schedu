import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchTab'

import QueryBar from './components/QueryBar'
import ContactTab from './components/ContactTab'

import { getAuthAsset } from '../../modules/auth'

export default function ContactListScreen() {

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
    const getContactUsers = async () => {
        const { token, userId } = await getAuthAsset()
        const payload = {
            headers: {
                'Schedu-Token': token,
                'Schedu-UID': userId
            }
        }
        const userResult = await axios.get(`http://localhost:3000/account/all`, payload)
        const contactUsers = userResult.data.users
        updateContacts(contactUsers)
    }

    // Professor btn for query data
    const getProfessor = async () => {
        const professor = await axios.get(`http://localhost:3000/account/role/teacher`)
        updateContacts(professor.data)
    }

    // Officer btn for query data
    const getOffice = async () => {
        const officer = await axios.get(`http://localhost:3000/account/role/staff`)
        updateContacts(officer.data)
    }

    //student btn fro query data
    const getStudent = async () => {
        const student = await axios.get(`http://localhost:3000/account/role/student`)
        updateContacts(student.data)
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

    // toggle display query and query bar
    const queryDisplay = () => {
        if (toggleQuery == 0) {
            return (
                <QueryBar

                />
            )
        }
    }

    return (
        <ScrollView style={styles.container}>
            <SearchBar
                searchWord={updateSearch}
                historyQuery={historyQuery}
                StarQuery={StarQuery}
                find={getSearch}
            />
            {suggestDisplay()}
            {toggleQuery ? null : <QueryBar all={getContactUsers} professor={getProfessor} officer={getOffice} student={getStudent} />}
            <ContactTab contacts={contacts} headerText={headerText} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {}
})
