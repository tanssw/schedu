import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import { background } from '../../../styles'
import { useNavigation } from '@react-navigation/native'

import { AntDesign, Fontisto, FontAwesome } from '@expo/vector-icons'

export default function SearchTab(props) {
    const navigation = useNavigation()

    return (
        <SafeAreaView>
            <View style={[styles.searchTab, (styles.backgroundColor = background.blue)]}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    // onChange={}
                    onChangeText={props.searchWord}
                    keyboardType={'default'}
                    multiline={false}
                    onSubmitEditing={props.find}
                />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ContactHistory', { businessId: 62070101 })
                    }}
                >
                    <Fontisto style={styles.iconHistory} name="history" size={22} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ContactFavorite')}>
                    <FontAwesome style={styles.iconStart} name="star" size={24} color="orange" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
    function test() {
        // props.alertWord
        alert('test')
    }
}
const styles = StyleSheet.create({
    searchTab: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'flex-start'
    },
    searchBar: {
        flex: 1,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 13
    },
    iconHistory: {
        width: 30,
        margin: 10,
        // marginTop: 17,
        // marginLeft: 14,
        padding: 5,
        paddingTop: 10
    },
    iconStart: {
        width: 30,
        margin: 10,
        // marginLeft: 5,
        // marginTop: 16,
        padding: 5,
        paddingTop: 9
    },
    iconSearch: {
        width: 30,
        margin: 10,
        // marginLeft: 5,
        // marginTop: 16,
        padding: 5,
        paddingTop: 8
    }
})
