import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Feather }  from '@expo/vector-icons'

import { shadow } from '../../../styles'

export default function TimeSelector() {
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
})