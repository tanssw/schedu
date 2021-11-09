import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

import { colorCode, shadow } from '../../../styles'

export default function Overview(props) {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.titleLine}>
                    <Text style={styles.title}>Appointment</Text>
                    <MaterialIcons name="schedule" size={18} color={colorCode.lightBlue} />
                </View>
                <Text style={styles.counter}>0</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.titleLine}>
                    <Text style={styles.title}>Requests</Text>
                    <Ionicons name="mail-outline" size={18} color={colorCode.lightBlue} />
                </View>
                <Text style={styles.counter}>0</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32
    },
    box: {
        borderWidth: 1,
        borderRadius: 16,
        borderColor: 'lightgrey',
        padding: 12,
        flex: 0.45,
    },
    titleLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    title: {
        fontSize: 14,
    },
    counter: {
        fontSize: 24,
        color: colorCode.lightBlue
    }
})