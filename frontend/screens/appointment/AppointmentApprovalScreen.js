import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import { background, text, shadow, colorCode } from '../../styles'
import { getAuthAsset, checkExpiredToken, clearAuthAsset } from '../../modules/auth'

import TimeDisplay from '../appointment/components/TimeDisplay'

export default function AppointmentApprovalScreen({ props, route }) {

    const { data } = route.params
    const navigation = useNavigation()

    const [subject, setSubject] = useState()
    const [commMethod, setCommMethod] = useState()
    const [commUrl, setCommUrl] = useState()
    const [note, setNote] = useState()
    const [participants, setParticipants] = useState([])

    useEffect(async () => {
        try {
            for (let index = 0; index < data.participants.length; index++) {
                const uid = data.participants[index]
                await getDetailsParticipants(uid)
            }
            getCommMethod()
        } catch (error) {
            console.log(error)
        }
    }, [])

    //FUNCTION: Get details user for display there name
    const getDetailsParticipants = async uid => {
        try {
            const { token } = await getAuthAsset()
            const payload = {
                headers: {
                    'schedu-token': token
                }
            }
            const peoples = await axios.get(`http://localhost:3000/account/${uid.userId}`, payload)
            setParticipants(peoples)
        } catch (error) {

        }
    }

    //FUNCTION: return commMethods for details
    const getCommMethod = () => {
        const commMethod = data.commMethod
        switch (commMethod) {
            case 'face': return setCommMethod('Face to Face')
            case 'msteam': return setCommMethod('Microsoft Teams')
            case 'meet': return setCommMethod('Google meet')
            case 'zoom': return setCommMethod('Zoom Application')
        }
    }

    // FUNCTION: update confirm state participant in appointment
    const submit = async (status, objectId) => {
        try {
            const { token, userId } = await getAuthAsset()
            const payload = {
                userId: userId,
                join: status,
                appointmentId: objectId,
                appointmentData: data
            }
            const config = {
                headers: { 'Schedu-Token': token }
            }
            await axios.put(`http://localhost:3000/appointment/`, payload, config)
            navigation.navigate('CalendarOverview')
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                navigation.navigate('SignIn')
            }
        }
    }

    // FUNCTION : User can decline or approve to join the appointment
    const decline = () => { submit(false, data._id) }
    const approval = () => { submit(true, data._id) }

    // FUNCTION: to render the participant into a Flatlist
    const renderParticipant = ({ item }) => {
        return (
            <View style={styles.profile}>
                <FontAwesome
                    name="user-circle-o"
                    size={44}
                    color={colorCode.dark}
                    style={styles.personImage}
                />
                <Text style={styles.personName}>{item.firstName}</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
                <TimeDisplay startAt={data.startAt} endAt={data.endAt} />
                <View style={[styles.detailContainer, shadow.boxTopMedium]}>
                    {/* Subject Input */}
                    <View style={styles.spaceBetweenInput}>
                        <Text style={styles.topic}>{data.subject}</Text>
                    </View>
                    {/* Participant Input */}
                    <View style={styles.spaceBetweenInput}>
                        <Text style={styles.header}>Participant</Text>
                        <View style={styles.participantContainer}>
                            <FlatList
                                horizontal
                                data={data.participants}
                                renderItem={renderParticipant}
                                keyExtractor={person => person._id}
                            />
                        </View>
                    </View>
                    {/* Communication Method Dropdown & Input */}
                    <View style={styles.spaceBetweenInput}>
                        <Text style={styles.header}>Communication Method</Text>
                        <View style={styles.commMethodBox}>
                            <Text style={styles.commMethodHeader}>{commMethod}</Text>
                            <Text style={styles.commMethodURL}>URL: {commUrl ? commUrl : '[Not provided]'}</Text>
                        </View>
                    </View>
                    {/* Note to participant Textbox */}
                    <View style={styles.spaceBetweenInput}>
                        <Text style={styles.header}>Note to participant</Text>
                        <Text>{data.note}</Text>
                    </View>
                    {/* Button */}
                    <View style={styles.decisionContainer}>
                        <TouchableOpacity style={[styles.mainButton, styles.declineButton]} onPress={() => { decline() }}>
                            <Text style={styles.declineText}>Decline</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.mainButton, styles.acceptButton]} onPress={() => { approval() }}>
                            <Text style={styles.acceptText}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1
    },
    innerContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    detailContainer: {
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        zIndex: 2,
        backgroundColor: 'white'
    },
    header: {
        fontWeight: 'bold',
        marginBottom: 12,
        fontSize: 16
    },
    topic: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colorCode.blue
    },
    participantContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    personName: {
        textAlign: 'center',
        marginTop: 4
    },
    personImage: {
        textAlign: 'center',
        marginVertical: 3,
        marginHorizontal: 12
    },
    spaceBetweenInput: {
        marginVertical: 12
    },
    commMethodBox: {
        borderWidth: 0.75,
        borderColor: colorCode.lighterGrey,
        borderRadius: 16,
        padding: 16
    },
    commMethodHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colorCode.lightBlue
    },
    commMethodURL: {
        fontSize: 14,
        color: colorCode.grey,
        marginTop: 8
    },
    decisionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    mainButton: {
        width: '47.5%',
        padding: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    declineButton: {
        borderWidth: 1,
        borderColor: colorCode.red
    },
    declineText: {
        color: colorCode.red,
        fontWeight: '300',
        fontSize: 16
    },
    acceptButton: {
        borderWidth: 1,
        borderColor: colorCode.blue,
        backgroundColor: colorCode.blue
    },
    acceptText: {
        color: 'white',
        fontWeight: '300',
        fontSize: 16
    },
    profile: {
        justifyContent: 'space-between'
    }
})
