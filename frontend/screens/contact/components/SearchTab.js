import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import { background, colorCode } from '../../../styles'
import { useNavigation } from '@react-navigation/native'

import { AntDesign, MaterialIcons } from '@expo/vector-icons'

export default function SearchTab(props) {

    const navigation = useNavigation()

    const navigateToHistory = () => {
        navigation.navigate('ContactHistory')
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchField}
                placeholder="Looking for someone ?"
                onChangeText={props.searchWord}
                keyboardType={'default'}
                multiline={false}
                onSubmitEditing={props.find}
            />
            <TouchableOpacity onPress={() => {navigateToHistory()}}>
                <MaterialIcons name="history" size={28} color="white" style={styles.history} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorCode.blue,
        padding: 16
    },
    searchField: {
        flex: 1,
        height: 35,
        backgroundColor: 'white',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    history: {
        marginLeft: 16
    }
})
