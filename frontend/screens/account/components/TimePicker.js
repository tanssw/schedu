import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Picker } from 'react-native-woodpicker'

import { hourItems, minuteItems } from '../../../assets/data/timeItems'

export default function TimePicker(props) {
    const splitTime = props.data.split(':')

    const [hour, setHour] = useState(splitTime[0])
    const [minute, setMinute] = useState(splitTime[1])

    const selectHourhandler = data => {
        setHour(data.value)
        didUpdate()
    }

    const selectMinutehandler = data => {
        setMinute(data.value)
        didUpdate()
    }

    const didUpdate = () => {
        props.update({ hour: hour, topic: props.topic, time: `${hour}:${minute}` })
    }
    return (
        <View style={[styles.settingData, styles.bottomLine, props.style]}>
            <Text style={[styles.textComponentStyle]}>{props.topic} of Active time</Text>
            <View style={styles.calendarData}>
                <Picker
                    item={hour}
                    items={hourItems}
                    placeholder={hour}
                    title="Hour"
                    isNullable={false}
                    style={styles.picker}
                    onItemChange={selectHourhandler}
                />
                <Text style={[styles.textComponentStyle]}> : </Text>
                <Picker
                    item={minute}
                    items={minuteItems}
                    title="Minute"
                    placeholder={minute}
                    isNullable={false}
                    style={styles.picker}
                    onItemChange={selectMinutehandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    settingData: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    calendarData: {
        flexDirection: 'row'
    },
    textComponentStyle: {
        color: '#555'
    },
    picker: {
        flex: 1
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: '#cccccc'
    }
})
