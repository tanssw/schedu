import React from 'react'
import { StyleSheet, View, TextInput} from 'react-native'
import { colorCode } from '../../../styles'


export default function SearchTab(props) {

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
