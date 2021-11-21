import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

import { background, text, shadow, colorCode } from '../../styles'
import { getAuthAsset, checkExpiredToken, clearAuthAsset } from '../../modules/auth'

import TimeDisplay from '../appointment/components/TimeDisplay'

export default function AppointmentScreen({props, route, navigation}) {

    const { data} = route.params

    const [displayCommMethod, setDisplayCommMethod] = useState()

    useEffect(() => {
        // getCommMethod()
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                getCommMethod()
            } catch (error) {}
        })
    })

    //FUNCTION: return commMethods for details
    const getCommMethod = () => {
        switch (data.commMethod) {
            case 'face': return setDisplayCommMethod('Face to Face')
            case 'msteam': return setDisplayCommMethod('Microsoft Teams')
            case 'meet': return setDisplayCommMethod('Google meet')
            case 'zoom': return setDisplayCommMethod('Zoom Application')
        }
    }
    // FUNCTION: to render the participant into a Flatlist
    const renderParticipant = ({ item, index }) => {
        return (
            <View style={[styles.profile, index ? {marginLeft: 16} : null]}>
                <FontAwesome
                    name="user-circle-o"
                    size={44}
                    color={colorCode.dark}
                    style={styles.personImage}
                />
                <Text style={styles.personName}>{item.firstName}</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
                <TimeDisplay startAt={data.startAt} endAt={data.endAt} />
                <View style={[styles.detailContainer, shadow.boxTopMedium]}>
                    {/* Subject Input */}
                    <View style={styles.spaceBetweenInput}>
                        <Text style={styles.topic}>{data.subject}</Text>
                    </View>
                    {/* Participant Input */}
                    <View style={styles.spaceBetweenInput}>
                        <Text style={styles.header}>Participant</Text>
                        <View style={styles.participantContainer}>
                            <FlatList
                                horizontal
                                data={data.participants}
                                renderItem={renderParticipant}
                                keyExtractor={person => person._id}
                            />
                        </View>
                    </View>
                    {/* Communication Method Dropdown & Input */}
                    <View style={styles.spaceBetweenInput}>
                        <Text style={styles.header}>Communication Method</Text>
                        <View style={styles.commMethodBox}>
                            <Text style={styles.commMethodHeader}>{displayCommMethod}</Text>
                            <Text style={styles.commMethodURL}>URL: {data.commUrl ? data.commUrl : '[Not provided]'}</Text>
                        </View>
                    </View>
                    {/* Note to participant Textbox */}
                    <View style={styles.spaceBetweenInput}>
                        <Text style={styles.header}>Note to participant</Text>
                        <Text style={styles.textBox}>{data.note}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1
    },
    innerContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    detailContainer: {
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        zIndex: 2,
        backgroundColor: 'white'
    },
    header: {
        fontWeight: 'bold',
        marginBottom: 12,
        fontSize: 16
    },
    topic: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colorCode.blue
    },
    participantContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    personName: {
        textAlign: 'center',
        fontWeight: '300'
    },
    personImage: {
        textAlign: 'center',
        marginVertical: 6
    },
    spaceBetweenInput: {
        marginVertical: 12
    },
    commMethodBox: {
        borderWidth: 0.75,
        borderColor: colorCode.lighterGrey,
        borderRadius: 16,
        padding: 16
    },
    commMethodHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colorCode.lightBlue
    },
    commMethodURL: {
        fontSize: 14,
        color: colorCode.grey,
        marginTop: 8
    },
    textBox: {
        fontWeight: '300'
    },
    decisionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    mainButton: {
        width: '47.5%',
        padding: 16,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile: {
        justifyContent: 'space-between'
    }
})
