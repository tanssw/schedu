import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const MOCKED_UP_DATA = [
    {id: 0, firstname: "Tasanai", lastname: "Srisawat"},
    {id: 1, firstname: "Tasanai", lastname: "Srisawat"},
    {id: 2, firstname: "Tasanai", lastname: "Srisawat"},
    {id: 3, firstname: "Tasanai", lastname: "Srisawat"}
]

export default function SuggestedList(props) {

    const renderContact = ({item, index}) => {
        return (
            <TouchableOpacity style={index ? styles.contactBoxMargin: ''}>
                <FontAwesome name="user-circle-o" size={48} color="grey" style={styles.personImage} />
                <Text style={styles.personName}>{item.firstname} {item.lastname[0]}.</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Suggested</Text>
            <FlatList horizontal data={MOCKED_UP_DATA} renderItem={renderContact} keyExtractor={(item, index) => index}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 32
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 18
    },
    footer: {
        marginBottom: 32
    },
    contactBoxMargin: {
        marginLeft: 12
    },
    personImage: {
        textAlign: 'center',
        marginBottom: 8,
        marginHorizontal: 12
    },
    personName: {
        textAlign: 'center',
        fontWeight: '300'
    }
})