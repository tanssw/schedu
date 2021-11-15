import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import axios from 'axios'

import axios from 'axios'

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchTab'
import QueryBar from './components/QueryBar'
import ContactTab from './components/ContactTab'

import { getAuthAsset } from '../../modules/auth'

export default function ContactListScreen() {

    const [headerText, updateHeaderText] = useState('Contact')
    const [participants, updateParticipants] = useState([])
    const [search, updateSearch] = useState('')
    const [toggleSuggest, updateToggleSuggest] = useState(0)
    const [toggleQuery, updateToggleQuery] = useState(0)

    useEffect(() => {
        getContactUsers()
    }, [])

    useEffect(() => {
        if (search == '') {
            getQueryAllPeople()
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
        updateParticipants(user.data)
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
        updateParticipants(contactUsers)
    }

    // Professor btn for query data
    const getProfessor = async () => {
        const professor = await axios.get(`http://localhost:3000/account/role/teacher`)
        updateParticipants(professor.data)
    }

    // Officer btn for query data
    const getOffice = async () => {
        const officer = await axios.get(`http://localhost:3000/account/role/staff`)
        updateParticipants(officer.data)
    }

    //student btn fro query data
    const getStudent = async () => {
        const student = await axios.get(`http://localhost:3000/account/role/student`)
        updateParticipants(student.data)
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
                    all={getContactUsers}
                    professor={getProfessor}
                    officer={getOffice}
                    student={getStudent}
                />
            )
        }
    }

    return (
        <SafeAreaView>
            <ScrollView nestedScrollEnabled>
                {/* SearchBar tab*/}
                <SearchBar
                    searchWord={updateSearch}
                    historyQuery={historyQuery}
                    StarQuery={StarQuery}
                    find={getSearch}
                />
                {/* Suggested Bar */}
                {/* <SuggestBar/> */}
                {suggestDisplay()}
                {/* queryTab */}
                {/* <QueryBar query={getContactUsers}/> */}
                {queryDisplay()}
                {/* contact tab */}
                <ContactTab participants={participants} headerText={headerText} />
            </ScrollView>
        </SafeAreaView>
    )
}
