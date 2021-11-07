import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { shadow } from '../../styles'

import NotificationCard from './components/NotificationCard'
import RecentlyList from './components/RecentlyList'
import SuggestedList from './components/SuggestedList'

export default function HomeScreen({navigation}) {

    const gotoMyCalendar = () => {
        navigation.navigate('Calendar')
    }

    return (
        <View style={styles.container}>
            <NotificationCard onAppointmentPress={gotoMyCalendar} />
            <View style={[styles.mainContainer, shadow.boxTopMedium]}>
                <SuggestedList />
                <RecentlyList />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 32,
        zIndex: 2,
        backgroundColor: 'white'
    }
})