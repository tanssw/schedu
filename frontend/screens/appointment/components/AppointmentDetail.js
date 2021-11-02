import React from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { Entypo }  from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'

import { shadow } from '../../../styles'

export default function AppointmentDetail() {
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
            </View>
            {/* Communication Method Dropdown & Input */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Communication Method</Text>
                <TouchableOpacity style={styles.commMethodSelector}>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={[
                            {label: 'Face to Face', value: 'face'},
                            {label: 'Microsoft Teams', value: 'msteam'},
                            {label: 'Google Meet', value: 'meet'},
                            {label: 'Zoom Application', value: 'zoom'}
                        ]}
                    />
                    <Entypo name="chevron-down" size={16} color="grey" />
                </TouchableOpacity>
            </View>

            {/* Note to participant Textbox */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Note to participant</Text>
                <ScrollView contentContainerStyle={styles.inputBoxBorder}>
                    <TextInput multiline numberOfLines={4} placeholder="This is a note ..." />
                </ScrollView>
            </View>
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
    commMethodSelector: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputUnderline: {
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 8,
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
    }
})