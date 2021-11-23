import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { colorCode } from '../../../styles'

export default function Information(props) {

    const changeDataHandler = text => {
        props.update({ topic: props.topicData, data: text })
    }

    let editState = props.edit

    return (
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
            >
                {props.data}
            </TextInput>
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
