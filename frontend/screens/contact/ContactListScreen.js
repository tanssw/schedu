import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchTab'
import QueryBar from './components/QueryBar'
import ContactTab from './components/ContactTab'
import { NavigationContainer } from '@react-navigation/native'
import axios from 'axios'

export default function ContactListScreen() {
    const [headerText, updateHeaderText] = useState('Contact')
    const [participants, updateParticipants] = useState([])
    const [search, updateSearch] = useState('')
    const [toggleSuggest, updateToggleSuggest] = useState(0)
    const [toggleQuery, updateToggleQuery] = useState(0)
    const [toggle, updateToggle] = useState(true)

    useEffect(() => {
        getQueryAllPeople()
    }, [])

    const getSearch = async () => {
        const user = await axios.get(`http://localhost:3000/account/search/${search}`)
        updateParticipants(user.data)
    }
    // All btn for query data
    const getQueryAllPeople = async () => {
        const all = await axios.get(`http://localhost:3000/account/all`)
        updateParticipants(all.data)
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
    const queryDisplay = () => {
        if (toggleQuery == 0) {
            return (
                <QueryBar
                    all={getQueryAllPeople}
                    professor={getProfessor}
                    officer={getOffice}
                    student={getStudent}
                />
            )
        }
    }
    const closeUpper = () => {
        if (search == '') {
            updateToggleSuggest(0)
            updateToggleQuery(0)
            //TODO when back contact home query all people
            // getQueryAllPeople()
        } else {
            //TODO when user typing can query realtime
            // getSearch(search)
            updateToggleSuggest(1)
            updateToggleQuery(1)
        }
    }

    return (
        <SafeAreaView>
            <ScrollView nestedScrollEnabled>
                {/* SearchBar tab*/}
                <SearchBar
                    searchWord={updateSearch}
                    closeUpper={closeUpper}
                    historyQuery={historyQuery}
                    StarQuery={StarQuery}
                    find={getSearch}
                />
                {/* Suggested Bar */}
                {/* <SuggestBar/> */}
                {suggestDisplay()}
                {/* queryTab */}
                {/* <QueryBar query={getQueryAllPeople}/> */}
                {queryDisplay()}
                {/* contact tab */}
                <ContactTab participants={participants} headerText={headerText} />
            </ScrollView>
        </SafeAreaView>
    )
}
