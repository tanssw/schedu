import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

export default function Information(props) {

    const [topic, setTopic] = useState(props.topicData)
    const [data, setdata] = useState(props.data)

    const changeDataHandler = text => {
        props.update({ topic: topic, data: text })
    }

    let editState = props.edit
    return (
        <View style={[styles.bottomLine, styles.userData]}>
            <Text
                style={[
                    styles.textComponentStyle,
                    editState ? styles.editable : styles.textComponentStyle
                ]}
            >
                {topic}
            </Text>
            <TextInput
                style={[
                    styles.textComponentStyle,
                    editState ? styles.editable : styles.textComponentStyle
                ]}
                editable={editState}
                onChangeText={changeDataHandler}
                placeholder="—"
            >
                {data}
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    userData: {
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: '#cccccc'
    },
    textComponentStyle: {
        fontSize: 15,
        color: '#555'
    },
    editable: {
        color: 'black'
    }
})
