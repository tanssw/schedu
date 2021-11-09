import React, { useState } from "react"
import { Text, View, StyleSheet, Switch, TextInput } from "react-native"

// Redux
import { useDispatch } from "react-redux"
import { toggleSetting } from "../../../store/actions/userAction"

export default function SettingData(props) {
    const [isEnabled, setIsEnabled] = useState(props.data)

    const dispatch = useDispatch()

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState)
        var settingTopic = props.topicData
        if (props.topicData === "Receive weekend appointment")
            settingTopic = "weekend"
        else if (props.topicData === "Display phone number")
            settingTopic = "phone"

        dispatch(
            toggleSetting({
                topic: settingTopic,
                data: !isEnabled,
            })
        )
    }

    if (props.type === "time") {
        return (
            <View style={[styles.bottomLine, styles.userData]}>
                <Text style={[styles.textComponentStyle]}>
                    {props.topicData}
                </Text>
                <TextInput>{props.data}</TextInput>
            </View>
        )
    } else {
        return (
            <View style={[styles.bottomLine, styles.userData]}>
                <Text style={[styles.textComponentStyle]}>
                    {props.topicData}
                </Text>
                <Switch onValueChange={toggleSwitch} value={isEnabled} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userData: {
        padding: 20,
        marginTop: 10,

        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: "#cccccc",
    },
    textComponentStyle: {
        color: "#555",
    },
})
