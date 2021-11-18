import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

export default function Information(props) {

    const changeDataHandler = text => {
        props.update({ topic: props.topicData, data: text })
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
                {props.topicData}
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
                {props.data}
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
