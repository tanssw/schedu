import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather }  from '@expo/vector-icons'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { colorCode, shadow } from '../../../styles'

dayjs.extend(utc)

export default function TimeSelector(props) {

    return (
        <View style={styles.timeSelectorContainer}>
            <View style={[styles.timeContainer, shadow.boxBottomSmall]}>
                <Feather name="clock" size={24} color="#aaaaaa" />
                <View style={styles.timeText}>
                    <Text style={styles.date}>
                        {dayjs(props.startAt).format('DD MMMM YYYY')}
                    </Text>
                    <Text style={styles.time}>
                        {dayjs(props.startAt).format('HH:mm')} - {dayjs(props.endAt).format('HH:mm')}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    timeSelectorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 32
    },
    timeContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    timeText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 8
    },
    date: {
        fontSize: 16,
        fontWeight: '300'
    },
    time: {
        fontSize: 18,
        fontWeight: '300',
        color: colorCode.blue
    },
    picker: {
        flex: 1
    },
})