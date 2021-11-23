import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import axios from 'axios'

import { checkExpiredToken, clearAuthAsset, getAuthAsset } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'

import { shadow } from '../../styles'

import ProfileHeader from './components/ProfileHeader'
import ProfileCalendar from './components/ProfileCalendar'
import ProfileInformation from './components/ProfileInformation'

export default function ContactProfileScreen({ route, navigation }) {

    const [profileState, updateProfileState] = useState({})
    const [emailState, updateEmailState] = useState()
    const [phoneState, updatePhoneState] = useState()
    const [activeTimeState, updateActiveTimeState] = useState({startAt: null, endAt: null})
    const [weekendReceiveState, updateWeekendReceiveState] = useState(false)

    const { contactId } = route.params

    const calendarRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserProfile()
            calendarRef.current.loadContactEvent()
        })
        return unsubscribe
    }, [])

    const getUserProfile = async () => {
        try {
            const { token } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token
                }
            }
            const userResult = await axios.get(`${API_SERVER_DOMAIN}/account/${contactId}`, payload)
            const user = userResult.data.user
            updateProfileState(user)
            updateEmailState(user.contact.email)
            updatePhoneState(user.contact.tel)
            updateActiveTimeState(user.setting.activeTime)
            updateWeekendReceiveState(user.setting.weekendReceive)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    const navigateToAppointmentCreator = (selectedDate) => {
        navigation.navigate('CreateAppointment', { contactId: contactId, date: selectedDate, activeTime: activeTimeState })
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <ProfileHeader profile={profileState} />
                <View style={[styles.mainContainer, shadow.boxTopMedium]}>
                    <View style={styles.calendarContainer}>
                        <ProfileCalendar ref={calendarRef} onDayPress={navigateToAppointmentCreator} isReceiveWeekend={weekendReceiveState} />
                    </View>
                    <ProfileInformation email={emailState} phone={phoneState} activeTime={activeTimeState} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    innerContainer: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        zIndex: 2,
        backgroundColor: 'white'
    },
    calendarContainer: {
        padding: 16,
        marginBottom: 24
    }
})
