import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Constants from 'expo-constants'
import axios from 'axios'

// import components
import SettingData from './components/SettingData'

import { getAuthAsset } from '../../modules/auth'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function SettingScreen({ route }) {
    const [settings, setSettings] = useState(route.params)

    const [displayTel, setDisplaytel] = useState(settings.displayTel)
    const [weekendReceive, setWeekendReceive] = useState(settings.weekendReceive)

    useFocusEffect(() => {
        return () => {
            updateSetting()
        }
    })

    const updateSetting = async () => {
        const { token, userId } = await getAuthAsset()

        const body = {
            id: userId,
            newData: {
                setting: {
                    displayTel: displayTel,
                    weekendReceive: weekendReceive,
                    activeTime: {
                        startAt: settings.activeTime.startAt,
                        endAt: settings.activeTime.endAt
                    }
                }
            }
        }

        const headers = {
            headers: { 'Schedu-Token': token }
        }

        try {
            const settings = await axios.put(
                `${API_SERVER_DOMAIN}/account/updateUser`,
                body,
                headers
            )
        } catch (error) {
            console.log(error)
        }
    }

    const changeSettingHandler = data => {
        switch (data.topic) {
            case 'weekend':
                setWeekendReceive(data.data)
                break
            case 'phone':
                setDisplaytel(data.data)
                break
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.dataBlock}>
                <Text style={styles.settingMenu}>Calendar</Text>
                <SettingData
                    topic={'Active time'}
                    data={settings.activeTime.startAt + ' - ' + settings.activeTime.endAt}
                    type={'time'}
                />
                <SettingData
                    topic={'Receive weekend appointment'}
                    data={settings.weekendReceive}
                    update={changeSettingHandler}
                />
            </View>
            <View style={styles.dataBlock}>
                <Text style={styles.settingMenu}>Privacy</Text>
                <SettingData
                    topic={'Display phone number'}
                    data={settings.displayTel}
                    update={changeSettingHandler}
                />
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
