import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

// import components
import SettingData from './components/SettingData'

export default function SettingScreen({ route }) {


    const [settings, setSettings] = useState(route.params)


    
    useFocusEffect(() => {
        return () => {
            
            console.log(settings)
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.dataBlock}>
                <Text style={styles.settingMenu}>Calendar</Text>
                <SettingData
                    topicData={'Active time'}
                    data={settings.activeTime.startAt + ' - ' + settings.activeTime.endAt}
                    type={'time'}
                />
                <SettingData
                    topicData={'Receive weekend appointment'}
                    data={settings.weekendReceive}
                />
            </View>
            <View style={styles.dataBlock}>
                <Text style={styles.settingMenu}>Privacy</Text>
                <SettingData topicData={'Display phone number'} data={settings.displayTel} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: 'white'
    },
    settingMenu: {
        fontWeight: 'bold',
        paddingLeft: 20
    },
    dataBlock: {
        marginBottom: 20
    }
})
