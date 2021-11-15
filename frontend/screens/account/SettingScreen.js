import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import axios from 'axios'

// import components
import SettingData from './components/SettingData'
import TimePicker from './components/TimePicker'

import { getAuthAsset } from '../../modules/auth'
import { hourItems, minuteItems } from './data/timeItems'

const API_SERVER_DOMAIN = Constants.manifest.extra.apiServerDomain

export default function SettingScreen({ route, navigation }) {
    const [settings, setSettings] = useState(route.params)

    const [displayTel, setDisplaytel] = useState(settings.displayTel)
    const [weekendReceive, setWeekendReceive] = useState(settings.weekendReceive)

    const [start, setStart] = useState(settings.activeTime.startAt)
    const [end, setEnd] = useState(settings.activeTime.endAt)

    const [hour, setHour] = useState(null)

    const [hourItems, setHours] = useState(hourItems)

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            updateSetting()
        })
        return unsubscribe
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
                        startAt: start,
                        endAt: end
                    }
                }
            }
        }

        const headers = {
            headers: { 'Schedu-Token': token }
        }

        try {
            await axios.put(`${API_SERVER_DOMAIN}/account/updateUser`, body, headers)
        } catch (error) {
            console.log(error)
        }
    }

    const changeActiveTimeHandler = data => {
        switch (data.topic) {
            case 'Start':
                setHour(data.hour)
                setStart(data.time)
                break
            case 'End':
                setHour(data.hour)
                setEnd(data.time)
                break
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

                <TimePicker topic={'Start'} data={start} update={changeActiveTimeHandler} />
                <TimePicker topic={'End'} data={end} update={changeActiveTimeHandler} />
                <SettingData
                    topic={'Receive weekend appointment'}
                    data={settings.weekendReceive}
                    timeHour={hourItems}
                    timeMin={minuteItems}
                    update={changeSettingHandler}
                />
            </View>
            <View style={styles.dataBlock}>
                <Text style={styles.settingMenu}>Privacy</Text>
                <SettingData
                    topic={'Display phone number'}
                    data={settings.displayTel}
                    timeHour={hourItems}
                    timeMin={minuteItems}
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
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: '#cccccc'
    }
})
