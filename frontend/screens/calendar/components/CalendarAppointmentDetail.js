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

import { background, text, shadow, colorCode } from '../../../styles'
import { getAuthAsset } from '../../../modules/auth'

function AppointmentDetail(props, ref) {
    // Component's States
    const [subject, setSubject] = useState()
    const [commMethod, setCommMethod] = useState()
    const [commUrl, setCommUrl] = useState()
    const [note, setNote] = useState()
    const [join, setJoin] = useState(false)

    // validate state
    const [isEmptySubject, setIsEmptySubject] = useState(true)
    const [isEmptyCommMethod, setIsEmptyCommMethod] = useState(true)
    const [isEmptyCommUrl, setIsEmptyCommUrl] = useState(true)

    const [participants, setParticipants] = useState([])

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
        //TODO Change appointment to appointmentId
        console.log(props.appointmentId)
        getAppointment(props.appointmentId)
        loadAppointment()
        
    }, [])
    const loadAppointment = (appointment) =>{
        setSubject(appointment.subject)
        setParticipants(appointment.participants)
        setCommMethod(getCommMethod(appointment.commMethod))
        setCommUrl(appointment.commUrl)
        setNote(appointment.note)
    }
    const getAppointment = async() =>{
        const {token, userId} = getAuthAsset()
        const payload = {
            headers: {
                'Schedu-Token': token,
                'Schedu-UID': userId
            }
        }
        try {
            const appointmentResult = await axios.get(`${API_SERVER_DOMAIN}/appointment/`, payload)
    }
    catch(error){
        console.error(error)
    }
}
    // FUNCTION: to reset all form state
    const resetState = () => {
        setSubject()
        setCommMethod()
        setCommUrl()
        setNote()
    }
    const getCommMethod = (data) => {
        switch (data) {
            case 'face': return { label: 'Face to Face', value: 'face' }
            case 'msteam': return { label: 'Microsoft Teams', value: 'msteam' }
            case 'meet': return { label: 'Google Meet', value: 'meet' }
            case 'zoom': return { label: 'Zoom Application', value: 'zoom' }
        }
    }

    // FUNCTION: to structure appointment data
    const updateAppointmentCall = () => {
        if (subject) {
            const data = {
                subject: subject,
                participants: participants,
                commMethod: commMethod ? commMethod.value : undefined,
                commUrl: commUrl,
                note: note
            }
            props.updateAppointment(data)
        } else {
            if (isEmptySubject) alert('Please enter Subject!')
        }
    }

    // FUNCTION: to render the participant into a Flatlist
    const renderParticipant = ({ item }) => {
        return (
            <View>
                <FontAwesome
                    name="user-circle-o"
                    size={44}
                    color="grey"
                    style={styles.personImage}
                />
                <Text style={styles.personName}>{item.firstName}</Text>
            </View>
        )
    }

    return (
        <View style={[styles.detailContainer, shadow.boxTopMedium]}>
            {/* Subject Input */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Subject</Text>
                <TextInput
                    onChangeText={text => setSubject(text)}
                    value={subject}
                    placeholder="Tomato Meeting"
                    style={[styles.inputUnderline]}
                />
            </View>
            {/* Participant Input */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Participant</Text>
                <View style={styles.participantContainer}>
                    <TouchableOpacity style={styles.participantAdder}>
                        <EvilIcons name="plus" size={64} color={colorCode.blue} />
                        <Text style={styles.personName}>Add</Text>
                    </TouchableOpacity>
                    <FlatList
                        horizontal
                        data={participants}
                        renderItem={renderParticipant}
                        keyExtractor={person => person._id}
                    />
                </View>
            </View>
            {/* Communication Method Dropdown & Input */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Communication Method</Text>
                <Picker
                    onItemChange={setCommMethod}
                    item={commMethod}
                    items={[
                        { label: 'Face to Face', value: 'face' },
                        { label: 'Microsoft Teams', value: 'msteam' },
                        { label: 'Google Meet', value: 'meet' },
                        { label: 'Zoom Application', value: 'zoom' }
                    ]}
                    title="Communication Methods"
                    placeholder="Choose method ..."
                    isNullable={false}
                    style={styles.picker}
                />
                <TextInput
                    onChangeText={text => setCommUrl(text)}
                    value={commUrl}
                    style={styles.inputUnderline}
                />
            </View>
            {/* Note to participant Textbox */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Note to participant</Text>
                <ScrollView contentContainerStyle={styles.inputBoxBorder}>
                    <TextInput
                        onChangeText={text => setNote(text)}
                        value={note}
                        multiline
                        numberOfLines={4}
                        placeholder="This is a note ..."
                    />
                </ScrollView>
            </View>
            {/* Button */}
            <TouchableOpacity
                onPress={updateAppointmentCall}
                style={[styles.mainButton, background.blue]}
            >
                <Text style={text.white}>Update Appointment</Text>
            </TouchableOpacity>
        </View>
    )
}

export default forwardRef(AppointmentDetail)

const styles = StyleSheet.create({
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
        marginBottom: 12
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
        marginBottom: 32
    },
    mainButton: {
        width: '100%',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center'
    }
})