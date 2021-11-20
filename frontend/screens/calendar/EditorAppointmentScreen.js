import React, { useCallback, useRef, useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../modules/apis'
import { clearAuthAsset, getAuthAsset } from '../../modules/auth'


import { checkExpiredToken } from '../../modules/auth'
import { background, text, shadow, colorCode } from '../../styles'
import TimeSelector from "../appointment/components/TimeSelector"
import AppointmentDetail from "../appointment/components/AppointmentDetail"


export default function EditAppointmentScreen({ route, navigation }) {
    const { data } = route.params
    useEffect(() => {
        console.log(data)
        
    }, [])
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <TimeSelector date={date} onStartChange={setFormattedStart} onEndChange={setFormattedEnd} />
                <AppointmentDetail onCreateAppointment={createAppointmentHandler} /> 
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1
    }
})