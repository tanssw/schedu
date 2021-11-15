import React, { useImperativeHandle, forwardRef, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Feather }  from '@expo/vector-icons'
import { Picker } from 'react-native-woodpicker'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { shadow } from '../../../styles'

dayjs.extend(utc)

function TimeSelector(props, ref) {

    // Component's States
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)

    useImperativeHandle(ref, () => ({
        resetChildState() { resetState() }
    }), [])

    // FUNCTION: to reset all form state
    const resetState = () => {
        setStart()
        setEnd()
    }

    // FUNCTION: to format the time into JS time string
    const formatTime = (time) => {
        const current = dayjs().format('YYYY-MM-DD')
        const formatted = dayjs(`${current} ${time}`, 'YYYY-MM-DD HH:mm').utcOffset(7).format()
        return formatted
    }

    // FUNCTION: to handle the changing of starting time
    const handleStartChange = (value) => {
        setStart(value)
        const time = formatTime(value.value)
        props.onStartChange(time)
    }

    // FUNCTION: to handle the changing of ending time
    const handleEndChange = (value) => {
        setEnd(value)
        const time = formatTime(value.value)
        props.onEndChange(time)
    }

    return (
        <View style={styles.timeSelectorContainer}>
            <View style={[styles.timeSelector, shadow.boxBottomSmall]}>
                <View style={styles.pickerContainer}>
                    <Text>{dayjs(props.startAt).format('HH:mm')}</Text>
                </View>
                <Feather name="clock" size={24} color="#aaaaaa" />
            </View>
            <View style={[styles.timeSelector, shadow.boxBottomSmall]}>
                <View style={styles.pickerContainer}>
                    <Text>{dayjs(props.endAt).format('HH:mm')}</Text>
                </View>
                <Feather name="clock" size={24} color="#aaaaaa" />
            </View>
        </View>
    )
}

export default forwardRef(TimeSelector)

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