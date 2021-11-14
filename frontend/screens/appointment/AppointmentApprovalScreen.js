import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from "react-native"
import { Picker } from 'react-native-woodpicker'
import { EvilIcons, FontAwesome } from '@expo/vector-icons'

import { background, text, shadow, colorCode } from '../../styles'

function AppointmentDetail(props, ref) {

    // Component's States
    const [subject, setSubject] = useState()
    const [commMethod, setCommMethod] = useState()
    const [commUrl, setCommUrl] = useState()
    const [note, setNote] = useState()

    const [participants, setParticipants] = useState([
        {_id: "618b4d47a996fac981059a6f", business_id: '62070184', firstname: 'Loukhin', lastname: 'Dotcom'},
    ])

    useImperativeHandle(ref, () => ({
        resetChildState() { resetState() }
    }), [])

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
    const renderParticipant = ({item}) => {
        return (
            <View>
                <FontAwesome name="user-circle-o" size={44} color="grey" style={styles.personImage} />
                <Text style={styles.personName}>{item.firstname}</Text>
            </View>
        )
    }

    return (
        <View style={[styles.detailContainer, shadow.boxTopMedium]}>
            {/* Subject Input */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Subject</Text>
                {/* <TextInput onChangeText={text => setSubject(text)} value={subject} placeholder="Tomato Meeting" style={[styles.inputUnderline]}/> */}
                <Text>Tomato Meeting</Text>
            </View>
            {/* Participant Input */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Participant</Text>
                <View style={styles.participantContainer}>
                    <TouchableOpacity style={styles.participantAdder}>
                        <EvilIcons name="plus" size={64} color={colorCode.blue} />
                        <Text style={styles.personName}>Add</Text>
                    </TouchableOpacity>
                    <FlatList horizontal data={participants} renderItem={renderParticipant} keyExtractor={person => person._id} />
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
                <Text>Test</Text>
            </View>
            {/* Note to participant Textbox */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Note to participant</Text>
                <ScrollView contentContainerStyle={styles.inputBoxBorder}>
                    <Text>It's a note from pluto</Text>
                </ScrollView>
            </View>
            {/* Button */}
            {/* <TouchableOpacity onPressOut={createAppointment} style={[styles.mainButton, background.blue]}>
                <Text style={text.white}>Create Appointment</Text>
            </TouchableOpacity> */}
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
        paddingBottom: 8,
    },
    participantContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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