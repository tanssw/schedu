import React, { useState } from 'react'
import { Text, View, StyleSheet, Switch, TextInput } from 'react-native'
import { Picker } from 'react-native-woodpicker'

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
            <View style={[styles.bottomLine, styles.settingData]}>
                <Text style={[styles.textComponentStyle]}>{props.topic}</Text>
                {/* <TextInput>{props.data}</TextInput> */}
                <View style={styles.calendarData}>
                    <Picker
                        items={[
                            { label: '09:00', value: '09:00' },
                            { label: '09:15', value: '09:15' },
                            { label: '09:30', value: '09:30' },
                            { label: '09:45', value: '09:45' },
                            { label: '10:00', value: '10:00' }
                        ]}
                        title="Start Time"
                        placeholder={props.data.start}
                        isNullable={false}
                        style={styles.picker}
                    />
                    <Text style={[styles.textComponentStyle]}> to </Text>
                    <Picker
                        items={[
                            { label: '09:00', value: '09:00' },
                            { label: '09:15', value: '09:15' },
                            { label: '09:30', value: '09:30' },
                            { label: '09:45', value: '09:45' },
                            { label: '10:00', value: '10:00' }
                        ]}
                        title="Start Time"
                        placeholder={props.data.end}
                        isNullable={false}
                        style={styles.picker}
                    />
                </View>
            </View>
        )
    } else {
        return (
            <View style={[styles.bottomLine, styles.settingData]}>
                <Text style={[styles.textComponentStyle]}>{props.topic}</Text>
                <Switch onValueChange={toggleSwitch} value={isEnabled} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    settingData: {
        padding: 20,
        marginTop: 10,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    calendarData: {
        flexDirection: 'row',
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: '#cccccc'
    },
    textComponentStyle: {
        color: '#555',
    },
    picker: {
        flex: 1
    }
})
