import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { shadow } from '../../styles'

import NotificationCard from './components/NotificationCard'
import Overview from './components/Overview'
import RecentlyList from './components/RecentlyList'
import SuggestedList from './components/SuggestedList'

export default function HomeScreen({navigation}) {

    const overviewRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            overviewRef.current.loadOverview()
        })
        return unsubscribe
    })

    const gotoMyCalendar = () => {
        navigation.navigate('Calendar')
    }

    return (
        <View style={styles.container}>
            <NotificationCard onAppointmentPress={gotoMyCalendar} />
            <View style={[styles.mainContainer, shadow.boxTopMedium]}>
                <Overview ref={overviewRef} />
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