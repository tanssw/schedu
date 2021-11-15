import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    FlatList
} from 'react-native'
import { Picker } from 'react-native-woodpicker'
import { EvilIcons, FontAwesome } from '@expo/vector-icons'
import {
    AUTH_TOKEN_KEY,
    AUTH_USER_ID,
    clearAuthAsset,
    getAuthAsset,
    setAuthAsset
} from '../../modules/auth'
import Time from '../appointment/components/TimeDisplay'

import { background, text, shadow, colorCode } from '../../styles'

function AppointmentDetail({ props, ref, route }) {
    const { data } = route.params

    // Component's States
    const [subject, setSubject] = useState()
    const [commMethod, setCommMethod] = useState()
    const [commUrl, setCommUrl] = useState()
    const [note, setNote] = useState()

    const [participants, setParticipants] = useState([
        {
            _id: '618b4d47a996fac981059a6f',
            business_id: '62070184',
            firstname: 'Loukhin',
            lastname: 'Dotcom'
        }
    ])

    //FUNCTION: Get details user for display they name
    const getDetailsParticipants = async uid => {
        const { token } = await getAuthAsset()
        const payload = {
            headers: {
                'schedu-token': token
            }
        }
        const peoples = await axios.get(
            `http://localhost:3000/account/`,
            { params: { id: uid } },
            payload
        )
        setParticipants(peoples)
    }
    //FUNCTION: return commMethods for details
    const getCommMethod = () => {
        const commMethod = data.commMethod
        if (commMethod == 'face') {
            setCommMethod('Face to Face')
        } else if (commMethod == 'msteam') {
            setCommMethod('Microsoft Teams')
        } else if (commMethod == 'meet') {
            setCommMethod('Google meet')
        } else if (commMethod == 'zoom') {
            setCommMethod('Zoom Application')
        }
    }
    // FUNCTION : user decline this appointment
    const decline = () =>{
        alert("decline")
    }
    //FUNCTION : user approval this appointment
    const approval = () =>{
        alert("Approval")
    }

    useImperativeHandle(
        ref,
        () => ({
            resetChildState() {
                resetState()
            }
        }),
        []
    )

    useEffect(() => {
        try {
            for (let index = 0; index < data.participants.length; index++) {
                const uid = data.participants[index]
                getDetailsParticipants(uid)
            }
            getCommMethod()
        } catch (error) {
            console.log(error)
        }
    }, [])
    // FUNCTION: to reset all form state
    const resetState = () => {
        setSubject()
        setCommMethod()
        setCommUrl()
        setNote()
    }

    // FUNCTION: to structure appointment data
    const createAppointment = () => {
        const data = {
            subject: subject,
            participants: participants.map(participant => participant._id),
            commMethod: commMethod ? commMethod.value : undefined,
            commUrl: commUrl,
            note: note
        }
        props.onCreateAppointment(data)
    }

    // FUNCTION: to render the participant into a Flatlist
    const renderParticipant = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    alert('Go Profiles')
                }}
            >
                <View style={styles.profile}>
                    <FontAwesome
                        name="user-circle-o"
                        size={44}
                        color="grey"
                        style={styles.personImage}
                    />
                    <Text style={styles.personName}>{item.firstName}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //TODO: time display startAt and endAt from appointment
    return (
        <ScrollView>
        <View style={styles.container}>
            <Time startAt={data.startAt} endAt={data.endAt}/>
            <View style={[styles.detailContainer, shadow.boxTopMedium]}>
                {/* Subject Input */}
                <View style={styles.spaceBetweenInput}>
                    <Text style={styles.header}>Subject</Text>
                    {/* <TextInput onChangeText={text => setSubject(text)} value={subject} placeholder="Tomato Meeting" style={[styles.inputUnderline]}/> */}
                    <Text style={styles.topic}>{data.subject}</Text>
                </View>
                {/* Participant Input */}
                <View style={styles.spaceBetweenInput}>
                    <Text style={styles.header}>Participant</Text>
                    <View style={styles.participantContainer}>
                        {/* <TouchableOpacity style={styles.participantAdder}>
                        <EvilIcons name="plus" size={64} color={colorCode.blue} />
                        <Text style={styles.personName}>Add</Text>
                    </TouchableOpacity> */}
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
                    {/* <Picker
                    onItemChange={setCommMethod}
                    item={commMethod}
                    items={[
                        {label: 'Face to Face', value: 'face'},
                        {label: 'Microsoft Teams', value: 'msteam'},
                        {label: 'Google Meet', value: 'meet'},
                        {label: 'Zoom Application', value: 'zoom'}
                    ]}
                    title="Communication Methods"
                    placeholder="Choose method ..."
                    isNullable={true}
                    style={styles.picker}
                /> */}
                    {/* <TextInput onChangeText={text => setCommUrl(text)} placeholder="https://www.url.com/join/" style={styles.inputUnderline}/> */}
                    <Text>{commMethod}</Text>
                </View>
                {/* Note to participant Textbox */}
                <View style={styles.spaceBetweenInput}>
                    <Text style={styles.header}>Note to participant</Text>
                    {/* <ScrollView contentContainerStyle={styles.inputBoxBorder}>
                
                </ScrollView> */}
                    <Text>{data.note}</Text>
                </View>
                {/* Button */}
                <View style={styles.acceptationTab}>
                    <TouchableOpacity style={[styles.mainButton,styles.decline]} onPress={() => {decline()}}>
                        <Text style={text.red}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.mainButton, background.blue]} onPress={() => {approval()}}>
                        <Text style={text.white}>Approval</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}

export default forwardRef(AppointmentDetail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 5
    },
    detailContainer: {
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 32,
        zIndex: 2,
        backgroundColor: 'white'
    },
    header: {
        fontWeight: 'bold',
        marginBottom: 12,
        fontSize: 18
    },
    topic:{
        fontSize: 16
    },
    inputUnderline: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 8
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
    picker: {
        flex: 1,
        padding: 16,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 16,
        marginBottom: 24
    },
    inputBoxBorder: {
        height: 128,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 16,
        padding: 16
    },
    spaceBetweenInput: {
        marginTop: 10,
        marginBottom: 10
    },
    mainButton: {
        width: '50%',
        height: 50,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginRight: 10
    },
    decline: {
        backgroundColor : "white",
        borderWidth: 2,
        borderColor: "red",
        color: 'black'
    },
    acceptationTab: {
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profile: {
        padding: 7
    }
})
