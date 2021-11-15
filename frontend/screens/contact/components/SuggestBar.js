import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { colorCode } from '../../../styles'

export default function SuggestBar() {
    const navigation = useNavigation()
    const [participants, updateParticipants] = useState([
        {
            id: 1,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 2,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 3,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 4,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 5,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 6,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 7,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        }
    ])

    const navigateContactProfile = () => {
        navigation.navigate('ContactProfile', { contactId: '617fb3f0396613a9e99b86a8' })
    }

    const renderParticipant = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {navigateContactProfile()}} style={index ? styles.marginLeftDefault : ''}>
                <FontAwesome name="user-circle-o" size={42} color={colorCode.blue} style={styles.personImage} />
                <Text style={styles.personName}>{item.firstname} {item.lastname[0]}.</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Suggested</Text>
            <View style={styles.suggestionContainer}>
                <FlatList
                    horizontal
                    data={participants}
                    renderItem={renderParticipant}
                    keyExtractor={person => person.id}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16
    },
    suggestionContainer: {
        flexDirection: 'row'
    },
    personName: {
        textAlign: 'center',
        marginTop: 6,
        fontWeight: '300'
    },
    personImage: {
        textAlign: 'center'
    },
    marginLeftDefault: {
        marginLeft: 12
    }
})
