import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Feather }  from '@expo/vector-icons'
import { Picker } from 'react-native-woodpicker'

import { shadow } from '../../../styles'

export default function TimeSelector() {
    return (
        <View style={styles.timeSelectorContainer}>
            <View style={[styles.timeSelector, shadow.boxBottomSmall]}>
                <View style={styles.pickerContainer}>
                    <Picker
                        onItemChange={(value) => console.log(value)}
                        items={[
                            {label: '09:00', value: '09:00'},
                            {label: '09:15', value: '09:15'},
                            {label: '09:30', value: '09:30'},
                            {label: '09:45', value: '09:45'},
                            {label: '10:00', value: '10:00'}
                        ]}
                        title="Start Time"
                        placeholder="Select Start Time"
                        isNullable={false}
                        style={styles.picker}
                    />
                </View>
                <Feather name="clock" size={24} color="#aaaaaa" />
            </View>
            <View style={[styles.timeSelector, shadow.boxBottomSmall]}>
                <View style={styles.pickerContainer}>
                    <Picker
                        onItemChange={(value) => console.log(value)}
                        items={[
                            {label: '09:00', value: '09:00'},
                            {label: '09:15', value: '09:15'},
                            {label: '09:30', value: '09:30'},
                            {label: '09:45', value: '09:45'},
                            {label: '10:00', value: '10:00'}
                        ]}
                        title="End Time"
                        placeholder="Select End Time"
                        isNullable={false}
                        style={styles.picker}
                    />
                </View>
                <Feather name="clock" size={24} color="#aaaaaa" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timeSelectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 32
    },
    timeSelector: {
        flex: 0.45,
        backgroundColor: 'white',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    pickerContainer: {
        flexGrow: 1
    },
    picker: {
        flex: 1
    },
})