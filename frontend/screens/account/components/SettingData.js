import React, { useState } from 'react'
import { Text, View, StyleSheet, Switch, TextInput } from 'react-native'

export default function SettingData(props) {
    const [isEnabled, setIsEnabled] = useState(props.data)

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        var settingTopic = props.topic
        if (props.topic === 'Receive weekend appointment') settingTopic = 'weekend'
        else if (props.topic === 'Display phone number') settingTopic = 'phone'

        props.update({ topic: settingTopic, data: !isEnabled })
    }

    if (props.type === 'time') {
        return (
            <View style={[styles.bottomLine, styles.userData]}>
                <Text style={[styles.textComponentStyle]}>{props.topic}</Text>
                <TextInput>{props.data}</TextInput>
            </View>
        )
    } else {
        return (
            <View style={[styles.bottomLine, styles.userData]}>
                <Text style={[styles.textComponentStyle]}>{props.topic}</Text>
                <Switch onValueChange={toggleSwitch} value={isEnabled} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userData: {
        padding: 20,
        marginTop: 10,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: '#cccccc'
    },
    textComponentStyle: {
        color: '#555'
    }
})
