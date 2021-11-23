import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { colorCode } from '../../../styles'

export default function ContactHeader(props) {
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.profile}>
                    <FontAwesome name="user-circle" size={48} color={colorCode.blue} />
                    <View style={styles.profileText}>
                        <Text style={styles.profileName}>
                            {props.profile.firstName} {props.profile.lastName}
                        </Text>
                        <Text style={styles.profileRole}>{props.profile.role}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    },
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileText: {
        marginLeft: 16
    },
    profileName: {
        fontWeight: '300',
        marginBottom: 4
    },
    profileRole: {
        color: colorCode.grey,
        fontSize: 12,
        fontWeight: '300'
    }
})
