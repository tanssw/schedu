import React, { useState } from 'react'
import { Text, View, StyleSheet, Switch } from 'react-native'

export default function SettingData(props) {
    const [isEnabled, setIsEnabled] = useState(props.data)

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        var settingTopic = props.topic
        if (props.topic === 'Receive Weekend Appointment') settingTopic = 'weekend'
        else if (props.topic === 'Display Phone Number') settingTopic = 'phone'

        props.update({ topic: settingTopic, data: !isEnabled })
    }
    return (
        <View style={[styles.bottomLine, styles.settingData, props.style]}>
            <Text style={[styles.textComponentStyle]}>{props.topic}</Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
        </View>
    )
}

const styles = StyleSheet.create({
    settingData: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    calendarData: {
        flexDirection: 'row'
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: '#cccccc'
    },
    textComponentStyle: {
        color: '#555'
    },
    picker: {
        flex: 1
    }
})
