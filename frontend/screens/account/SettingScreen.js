import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import axios from 'axios'

import SettingData from './components/SettingData'
import TimePicker from './components/TimePicker'

import { getAuthAsset, clearAuthAsset, checkExpiredToken } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'
import { hourItems, minuteItems } from './data/timeItems'

import { colorCode } from '../../styles'

export default function SettingScreen({ route, navigation, setting, onSettingUpdated }) {

    const [displayTel, setDisplaytel] = useState(setting.displayTel)
    const [weekendReceive, setWeekendReceive] = useState(setting.weekendReceive)

    const [start, setStart] = useState(setting.activeTime.startAt)
    const [end, setEnd] = useState(setting.activeTime.endAt)

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
            const updatedResult = await axios.put(`${API_SERVER_DOMAIN}/account/`, body, headers)
            const user = updatedResult.data.user
            onSettingUpdated(user)
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
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
                <TimePicker topic={'Start'} data={start} update={changeActiveTimeHandler} style={styles.topSection} />
                <TimePicker topic={'End'} data={end} update={changeActiveTimeHandler} />
                <SettingData
                    topic={'Receive Weekend Appointment'}
                    data={setting.weekendReceive}
                    timeHour={hourItems}
                    timeMin={minuteItems}
                    update={changeSettingHandler}
                />
            </View>
            <View style={styles.dataBlock}>
                <Text style={styles.settingMenu}>Privacy</Text>
                <SettingData
                    topic={'Display Phone Number'}
                    data={setting.displayTel}
                    timeHour={hourItems}
                    timeMin={minuteItems}
                    update={changeSettingHandler}
                    style={styles.topSection}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        backgroundColor: 'white'
    },
    settingMenu: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colorCode.blue,
        paddingHorizontal: 24,
        marginBottom: 16
    },
    dataBlock: {
        marginBottom: 48
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderColor: '#cccccc'
    },
    topSection: {
        borderTopWidth: 0.75,
        borderTopColor: colorCode.lighterGrey
    }
})
