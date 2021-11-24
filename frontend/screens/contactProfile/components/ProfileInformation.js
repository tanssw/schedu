import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { colorCode } from '../../../styles'

export default function ProfileInformation(props) {
    return (
        <View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Active Time</Text>
                <Text style={styles.value}>
                    {props.activeTime.startAt} - {props.activeTime.endAt}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{props.email}</Text>
            </View>
            <View style={[styles.infoContainer, { borderBottomWidth: 1 }]}>
                <Text style={styles.label}>Phone Number</Text>
                <Text style={styles.value}>{props.phone ? props.phone : '—'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'lightgrey'
    },
    label: {
        color: colorCode.grey,
        fontWeight: '300'
    },
    value: {
        fontWeight: '300'
    }
})
