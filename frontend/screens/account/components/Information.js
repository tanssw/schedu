import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { colorCode } from '../../../styles'

export default function Information(props) {

    const [keyboardHeight, updateKeyboardHeight] = useState(0)

    const changeDataHandler = text => {
        props.update({ topic: props.topicData, data: text })
    }

    const toggleKeyboardHeight = (openKeyboard) => {
        if (props.last) {
            openKeyboard ? updateKeyboardHeight(128) : updateKeyboardHeight(0)
        }
    }

    let editState = props.edit

    return (
        <View>
            <View style={[styles.userData, styles.bottomLine, props.style]}>
                <Text
                    style={styles.topic}
                >
                    {props.topicData}
                </Text>
                <TextInput
                    style={[
                        styles.data,
                        editState ? styles.editable : ''
                    ]}
                    editable={editState}
                    onChangeText={changeDataHandler}
                    placeholder="empty"
                    keyboardType={props.keyboard}
                    onFocus={() => {toggleKeyboardHeight(true)}}
                    onBlur={() => {toggleKeyboardHeight(false)}}
                >
                    {props.data}
                </TextInput>
            </View>
            <View style={{marginBottom: keyboardHeight}}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    userData: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomLine: {
        borderBottomWidth: 0.75,
        borderBottomColor: colorCode.lighterGrey
    },
    topic: {
        fontSize: 14,
        color: colorCode.dark
    },
    data: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
        color: colorCode.dark,
        marginLeft: 32
    },
    editable: {
        fontSize: 14,
        color: 'black',
        fontWeight: '300'
    }
})
