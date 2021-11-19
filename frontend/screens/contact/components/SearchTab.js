import React from 'react'
import { StyleSheet, View, TextInput} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { colorCode } from '../../../styles'

export default function SearchTab(props) {

    let sendSearchText

    const onSearchUpdate = (text) => {
        clearTimeout(sendSearchText)
        sendSearchText = setTimeout(() => {
            props.searchWord(text)
        }, 250)
    }

    return (
        <View style={styles.container}>
            <FontAwesome name="search" size={20} color="white" />
            <TextInput
                style={styles.searchField}
                placeholder="Looking for someone ?"
                onChangeText={onSearchUpdate}
                keyboardType={'default'}
                multiline={false}
            />
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
        marginLeft: 16,
        borderRadius: 4
    },
    history: {
        marginLeft: 16
    }
})
