import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome } from '@expo/vector-icons'
import { colorCode } from '../../../styles'

export default function ContactTab(props) {

    const [headerText, updateHeaderText] = useState('Contact')

    const navigation = useNavigation()

    // Navigate to contact profile screen of selected contact.
    const navigateToProfile = (userId) => {
        navigation.navigate('ContactProfile', { contactId: userId })
    }

    const renderContact = (contact) => {
        return (
            <TouchableOpacity onPress={() => {navigateToProfile(contact._id)}} key={contact._id} style={styles.listItem}>
                <FontAwesome name="user-circle-o" size={42} color={colorCode.blue} style={styles.personImage} />
                <View style={styles.personDetail}>
                    <Text style={styles.personName}>
                        {contact.firstName} {contact.lastName}
                    </Text>
                    <Text style={[styles.personRole]}>{contact.role}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.contactContainer}>
            <Text style={styles.header}>{props.headerText}</Text>
            <View style={styles.listContainer}>
                {props.contacts.map(contact => renderContact(contact))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    contactContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white'
    },
    listContainer: {

    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8
    },
    header: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8
    },
    personImage: {

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
