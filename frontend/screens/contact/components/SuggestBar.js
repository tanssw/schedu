import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

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

    const renderParticipant = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ContactProfile', { businessId: 62070101 })
                }}
            >
                <View>
                    <FontAwesome
                        name="user-circle-o"
                        size={44}
                        color="grey"
                        style={styles.personImage}
                    />
                    <Text style={styles.personName}>{item.firstname}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.suggestTab}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Suggested</Text>
            <View style={styles.participantContainer}>
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
    suggestTab: {
        margin: 15
    },
    participantContainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 20
    },
    personName: {
        textAlign: 'center',
        marginTop: 4
    },
    personRole: {
        textAlign: 'left'
    },
    personImage: {
        textAlign: 'center',
        marginVertical: 3,
        marginHorizontal: 20
    }
})
