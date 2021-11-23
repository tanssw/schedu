import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'

import { shadow } from '../../styles'

import NotificationCard from './components/NotificationCard'
import General from './components/General'
import Overview from './components/Overview'
import RecentlyList from './components/RecentlyList'

export default function HomeScreen({ navigation }) {
    const notificationRef = useRef()
    const overviewRef = useRef()
    const recentlyRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            notificationRef.current.loadNewest()
            overviewRef.current.loadOverview()
            recentlyRef.current.loadRecentlyContacts()
        })
        return unsubscribe
    })

    const gotoMyCalendar = () => {
        navigation.navigate('Calendar')
    }

    return (
        <View style={styles.container}>
            <NotificationCard ref={notificationRef} onAppointmentPress={gotoMyCalendar} />
            <View style={[styles.mainContainer, shadow.boxTopMedium]}>
                <General />
                <Overview ref={overviewRef} />
                <RecentlyList ref={recentlyRef} />
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
        padding: 24,
        zIndex: 2,
        backgroundColor: 'white'
    }
})
