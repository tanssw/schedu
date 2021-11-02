import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native'
import { Feather }  from '@expo/vector-icons'

import { shadow } from '../../styles'

const TimeSelector = () => {
    return (
        <View style={styles.timeSelectorContainer}>
            <TouchableOpacity style={[styles.timeSelector, shadow.boxBottomSmall]}>
                <Text>Start</Text>
                <Feather name="clock" size={24} color="#aaaaaa" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.timeSelector, shadow.boxBottomSmall]}>
                <Text>End</Text>
                <Feather name="clock" size={24} color="#aaaaaa" />
            </TouchableOpacity>
        </View>
    )
}

const AppointmentDetail = () => {
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
            </View>
            {/* Note to participant Textbox */}
            <View style={styles.spaceBetweenInput}>
                <Text style={styles.header}>Note to participant</Text>
                <ScrollView contentContainerStyle={styles.inputBoxBorder}>
                    <TextInput multiline numberOfLines={4} placeholder="This is a note ..." style={styles.inputBox} />
                </ScrollView>
            </View>
        </View>
    )
}

export default function AppointmentEditorScreen() {
    return (
        <View style={styles.container}>
            <TimeSelector />
            <AppointmentDetail />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    timeSelectorContainer: {
        flex: 0.175,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    detailContainer: {
        flex: 0.825,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 32,
        zIndex: 2,
        backgroundColor: 'white'
    },
    timeSelector: {
        flex: 0.45,
        backgroundColor: 'white',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
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
    inputBoxBorder: {
        height: 128,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 16,
        padding: 16
    },
    inputBox: {

    },
    spaceBetweenInput: {
        marginBottom: 32
    }
})