import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather }  from '@expo/vector-icons'

import { shadow } from '../../styles'

export default function AppointmentEditorScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.timeSelectorContainer}>
                <TouchableOpacity style={[styles.timeSelector, shadow.box]}>
                    <Text>Start</Text>
                    <Feather name="clock" size={24} color="#aaaaaa" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.timeSelector, shadow.box]}>
                    <Text>End</Text>
                    <Feather name="clock" size={24} color="#aaaaaa" />
                </TouchableOpacity>
            </View>
            <View style={styles.DetailContainer}></View>
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
        paddingHorizontal: 16
    },
    DetailContainer: {
        flex: 0.825,
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
})