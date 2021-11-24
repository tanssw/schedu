import React, { useRef, useState, useEffect } from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../modules/apis'
import { clearAuthAsset, getAuthAsset } from '../../modules/auth'

import { checkExpiredToken } from '../../modules/auth'
import CalendarAppointmentDetail from './components/CalendarAppointmentDetail'
import CalendarTimeSelector from './components/CalendarTimeSelector'
import Participants from './components/Participants'

export default function EditAppointmentScreen({ route, navigation }) {

    const scrollViewRef = useRef()
    const CalendarAppointmentDetailRef = useRef()

    const [formattedStart, setFormattedStart] = useState()
    const [formattedEnd, setFormattedEnd] = useState()
    const [activeTimeState, updateActiveTimeState] = useState(null)

    const { data, participants } = route.params

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await getAppointment(data, participants)
        })
        return unsubscribe
    })

    const getAppointment = async (appointmentId, participants) => {
        try {
            const { token, userId } = await getAuthAsset()
            const payload = {
                headers: {
                    'schedu-token': token,
                    'schedu-uid': userId
                }
            }

            const appointmentResult = await axios.get(
                `${API_SERVER_DOMAIN}/appointment/${appointmentId}`,
                payload
            )
            const appointment = appointmentResult.data.result
            const receiver = appointment.participants.filter(
                participant => participant.main === true
            )
            getActiveTime(receiver)
            setFormattedStart(appointment.startAt)
            setFormattedEnd(appointment.endAt)
            let shownParticipants = (participants.length) ? participants : appointment.participants
            CalendarAppointmentDetailRef.current.initComponent(shownParticipants, appointment)

        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
        }
    }
    const getActiveTime = async receiver => {
        try {
            const { token } = await getAuthAsset()
            const payload = {
                headers: {
                    'Schedu-Token': token
                }
            }
            const userResult = await axios.get(
                `${API_SERVER_DOMAIN}/account/${receiver[0].userId}`,
                payload
            )
            const user = userResult.data.user
            updateActiveTimeState(user.setting.activeTime)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    const updateAppointment = async appointmentData => {
        try {
            const { token } = await getAuthAsset()
            const header = {
                headers: {
                    'Schedu-Token': token
                }
            }

            const payload = {
                _id: appointmentData._id,
                subject: appointmentData.subject,
                sender: appointmentData.sender,
                receiver: appointmentData.contactId,
                status: appointmentData.status,
                participants: appointmentData.participants,

                startAt: formattedStart,
                endAt: formattedEnd,
                commMethod: appointmentData.commMethod,
                commUrl: appointmentData.commUrl,
                note: appointmentData.note
            }

            await axios.put(`${API_SERVER_DOMAIN}/appointment/`, payload, header)
            navigation.navigate('Appointment', { data: payload })
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
        }
    }
    const updateHandler = () => {
        navigation.setParams({ participants: null })
    }

    const goChooseParticipant = data => {
        navigation.navigate('ChooseParticipants', data)
    }

    return (
        <ScrollView ref={scrollViewRef} onContentSizeChange={() => {scrollViewRef.current.scrollToEnd({animated: true})}} contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                {formattedStart && formattedEnd && activeTimeState ? (
                    <CalendarTimeSelector
                        onStartChange={setFormattedStart}
                        onEndChange={setFormattedEnd}
                        loadStart={formattedStart}
                        loadEnd={formattedEnd}
                        activeTime={activeTimeState}
                    />
                ) : null}
                <CalendarAppointmentDetail
                    ref={CalendarAppointmentDetailRef}
                    updateAppointment={updateAppointment}
                    chooseParticipant={goChooseParticipant}
                    navigation={navigation}
                    onUpdateParticipant={updateHandler}
                />
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
    }
})
