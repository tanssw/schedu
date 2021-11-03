import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from "react-native"
import { Picker } from 'react-native-woodpicker'
import { EvilIcons } from '@expo/vector-icons'

import { background, text, shadow, colorCode } from '../../../styles'

export default function AppointmentDetail() {

    const [participants, addParticipants] = useState([])

    return (
        <View style={[styles.detailContainer, shadow.boxTopMedium]}>
            {/* Subject Input */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Subject</Text>
                <TextInput placeholder="Tomato Meeting" style={[styles.inputUnderline]}/>
            </View>
            {/* Participant Input */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Participant</Text>
                <View style={styles.participantContainer}>
                    <TouchableOpacity styles={styles.btnAddParticipant}>
                        <EvilIcons name="plus" size={64} color="grey" />
                        <Text style={styles.btnAddParticipantText}>Add</Text>
                    </TouchableOpacity>
                    <FlatList horizontal data={participants} />
                </View>
            </View>
            {/* Communication Method Dropdown & Input */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Communication Method</Text>
                <Picker
                    onItemChange={(value) => console.log(value)}
                    items={[
                        {label: 'Face to Face', value: 'face'},
                        {label: 'Microsoft Teams', value: 'msteam'},
                        {label: 'Google Meet', value: 'meet'},
                        {label: 'Zoom Application', value: 'zoom'}
                    ]}
                    title="Communication Methods"
                    placeholder="Select Data"
                    isNullable={false}
                    style={styles.picker}
                />
            </View>
            {/* Note to participant Textbox */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Note to participant</Text>
                <ScrollView contentContainerStyle={styles.inputBoxBorder}>
                    <TextInput multiline numberOfLines={4} placeholder="This is a note ..." />
                </ScrollView>
            </View>
            {/* Button */}
            <TouchableOpacity style={[styles.mainButton, background.blue]}>
                <Text style={text.white}>Create Appointment</Text>
            </TouchableOpacity>
        </View>
    )
}

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
        flexDirection: 'row'
    },
    btnAddParticipantText: {
        textAlign: 'center',
        marginTop: 4
    },
    picker: {
        flex: 1,
        padding: 16,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 16
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