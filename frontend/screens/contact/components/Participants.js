import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { colorCode } from '../../../styles'

export default function Participants(props) {
    const [contact, SetContact] = useState(props.contact)
    const chooseHandler = () => {
        props.choose({
            contactId: props.data.contactId,
            date: props.data.date,
            activeTime: props.data.activeTime,
            participant: {
                _id: contact._id,
                firstName: contact.firstName,
                lastName: contact.lastName
            }
        })
    }

    return (
        <TouchableOpacity onPress={chooseHandler} style={styles.listItem}>
            <FontAwesome name="user-circle-o" size={42} color={colorCode.blue} />
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
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        padding: 8
    },
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
