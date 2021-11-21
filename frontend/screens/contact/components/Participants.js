import React, { useState, useEffect } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome, Feather } from '@expo/vector-icons'

import { colorCode, text } from '../../../styles'

export default function Participants(props) {
    const [contact, SetContact] = useState(props.contact)

    const { contactId, date, activeTime } = props.data

    const chooseHandler = () => {
        props.choose({
            contactId: contactId,
            date: date,
            activeTime: activeTime,
            participant: {
                _id: contact._id,
                firstName: contact.firstName,
                lastName: contact.lastName
            }
        })
    }

    return (
        <TouchableOpacity onPress={chooseHandler} style={styles.listItem}>
            <FontAwesome
                name="user-circle-o"
                size={42}
                color={colorCode.blue}
                style={styles.personImage}
            />
            <View style={styles.personDetail}>
                <Text style={styles.personName}>
                    {contact.firstName} {contact.lastName}
                </Text>
                <Text style={[styles.personRole]}>{contact.role}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    contactContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    },
    emptyContainer: {
        minHeight: 144,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: colorCode.grey,
        marginTop: 8
    },
    listContainer: {},
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        padding: 8
    },
    selectedParticipant: {
        backgroundColor: colorCode.green
    },
    header: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8
    },
    personImage: {},
    personDetail: {
        flex: 1,
        marginLeft: 16
    },
    personName: {
        color: colorCode.dark
    },
    personRole: {
        fontSize: 14,
        fontWeight: '300',
        color: colorCode.grey
    }
})
