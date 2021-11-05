import React, {useState} from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";

export default function UserData(props) {
    let editState = props.editState
    return (
        <View style={[styles.bottomLine, styles.userData]}>
            <Text style={[styles.textComponentStyle, editState ? styles.editable : styles.textComponentStyle]}>{props.topicData}</Text>
            <TextInput style={[styles.textComponentStyle, editState ? styles.editable : styles.textComponentStyle]} editable={editState}>
                {props.data}
            </TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    userData: {
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,

        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: "#cccccc",
    },
    textComponentStyle: {
        fontSize: 15,
        color: "#555",
    },
    editable: {
        color: "black",
    }
})
