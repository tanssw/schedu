import React, { useCallback, useRef, useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import axios from 'axios'

import { API_SERVER_DOMAIN } from '../../modules/apis'
import { clearAuthAsset, getAuthAsset } from '../../modules/auth'


import dayjs from 'dayjs'

import { checkExpiredToken } from '../../modules/auth'
import { background, text, shadow, colorCode } from '../../styles'
import CalendarAppointmentDetail from './components/CalendarAppointmentDetail'
import CalendarTimeSelector from './components/CalendarTimeSelector'


export default function EditAppointmentScreen({ route, navigation }) {
    const { data } = route.params
    const [date, setDate] = useState()
    const [formattedStart, setFormattedStart] = useState()
    const [formattedEnd, setFormattedEnd] = useState()
    useEffect(() => {
        const date = dayjs(data.startAt).format('YYYY-MM-DD')
        setDate(data.startAt)
        const start = dayjs(data.startAt).format('HH:MM')
        const end = dayjs(data.endAt).format('HH:MM')
        setFormattedStart(start)
        setFormattedEnd(end)
    }, [])
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
            {/* <CalendarTimeSelector
                    ref={timeSelectorComponent}
                    date={date}
                    onStartChange={setFormattedStart}
                    onEndChange={setFormattedEnd}
                    activeTime={route.params.activeTime}
                /> */}
                <CalendarAppointmentDetail appointment={data} /> 
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