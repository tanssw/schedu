import React, { useImperativeHandle, forwardRef, useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Picker } from 'react-native-woodpicker'
import { hourItems, minuteItems, filterHour, filterMinute } from '../../../assets/data/timeItems'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { colorCode, shadow } from '../../../styles'

dayjs.extend(utc)

function TimeSelector(props, ref) {
    // Component's States
    const [startHour, setStartHour] = useState()
    const [startMinute, setStartMinute] = useState(null)

    const [endHour, setEndHour] = useState()
    const [endMinute, setEndMinute] = useState(null)

    const [startHourItems, setStartHourItems] = useState(null)
    const [endHourItems, setEndHourItems] = useState(null)

    const [startMinuteItems, setStartMinuteItems] = useState(minuteItems)
    const [endMinuteItems, setEndMinuteItems] = useState(minuteItems)

    const [isDisable, setIsDisable] = useState(false)

    const start = props.activeTime.startAt.split(':')
    const end = props.activeTime.endAt.split(':')
    const startNew = dayjs(props.loadStart)
    const endNew = dayjs(props.loadEnd)
    useState(() => {
        setStartHourItems(filterHour(start[0], end[0]))
        setEndHourItems(filterHour(start[0], end[0]))
    })
    useEffect(() => {
        console.log(props.loadStart, props.loadEnd)
        if(startNew){
            console.log("Loubk")
            setStartHour({ label: startNew.format('HH'), value: startNew.format('HH') })
            setStartMinute({ label: startNew.format('mm'), value: startNew.format('mm')})
        }
        if(endNew){
            console.log("Loubk")
            setEndHour({ label: endNew.format('HH'), value: endNew.format('HH') })
            setEndMinute({ label: endNew.format('mm'), value: endNew.format('mm') })
        }
    }, [])
    useImperativeHandle(
        ref,
        () => ({
            resetChildState() {
                resetState()
            }
        }),
        []
    )

    // FUNCTION: to reset all form state
    const resetState = () => {
        setStart()
        setEnd()
    }

    // FUNCTION: to format the time into JS time string
    const formatTime = time => {
        const date = dayjs(props.date).format('YYYY-MM-DD')
        const formatted = dayjs(`${date} ${time}`, 'YYYY-MM-DD HH:mm').utcOffset(7).format()
        return formatted
    }

    const updateHandler = type => {
        if (type === 'start') {
            if (startHour !== null && startMinute !== null) {
                const time = formatTime(`${startHour.value}:${startMinute.value}`)
                setIsDisable(false)
                props.onStartChange(time)
            }
        } else if (type === 'end') {
            if (endHour !== null && endMinute !== null) {
                const time = formatTime(`${endHour.value}:${endMinute.value}`)
                props.onEndChange(time)
            }
        }
    }

    const validateTime = (value, type) => {
        if (type === 'start') {
            if (value.value === start[0]) {
                setStartMinuteItems(filterMinute(start[1], '55'))
                setStartMinute({ label: start[1], value: start[1] })
            } else if (value.value === end[0]) {
                setStartMinuteItems(filterMinute('00', end[1]))
                setStartMinute({ label: start[1], value: start[1] })
            } else setStartMinuteItems(minuteItems)
        } else if (type === 'end') {
            if (value.value === start[0]) setEndMinuteItems(filterMinute('00', end[1]))
            else if (value.value === end[0]) {
                setEndMinuteItems(filterMinute('00', end[1]))
                setEndMinute({ label: end[1], value: end[1] })
            } else if (value.value === startHour.value)
                setEndMinuteItems(filterMinute(startMinute.value, '55', true))
            else setEndMinuteItems(minuteItems)
        }
    }

    // FUNCTION: to handle the changing of starting time hour
    const handleStartHourChange = value => {
        setStartHour(value)
        setEndHourItems(filterHour(value.value, end[0]))
        validateTime(value, 'start')
        updateHandler('start')
    }

    // FUNCTION: to handle the changing of starting time minute
    const handleStartMinuteChange = value => {
        setStartMinute(value)
        if (value.value === '55') setEndHourItems(filterHour(startHour.value, end[0], true))
        updateHandler('start')
    }

    // FUNCTION: to handle the changing of ending time hour
    const handleEndHourChange = value => {
        setEndHour(value)
        validateTime(value, 'end')
        updateHandler('end')
    }

    // FUNCTION: to handle the changing of ending time minute
    const handleEndMinuteChange = value => {
        setEndMinute(value)
        updateHandler('end')
    }

    return (
        <View style={styles.timeSelectorContainer}>
            <View style={[styles.timeSelector, shadow.boxBottomSmall]}>
                <View style={styles.pickerContainer}>
                    <Picker
                        onItemChange={handleStartHourChange}
                        item={startHour}
                        items={startHourItems}
                        title="Start Time"
                        placeholder="Start"
                        isNullable={true}
                        style={styles.picker}
                    />
                    <Text> : </Text>
                    <Picker
                        onItemChange={handleStartMinuteChange}
                        item={startMinute}
                        items={startMinuteItems}
                        title="Start Time"
                        placeholder="Start"
                        isNullable={true}
                        style={styles.picker}
                    />
                </View>
                <Feather name="clock" size={24} color="#aaaaaa" />
            </View>
            <View style={[styles.timeSelector, shadow.boxBottomSmall]}>
                <View style={styles.pickerContainer}>
                    <Picker
                        onItemChange={handleEndHourChange}
                        item={endHour}
                        items={endHourItems}
                        title="End Time"
                        placeholder="End"
                        isNullable={true}
                        style={styles.picker}
                        placeholderStyle={styles.disablePicker}
                        disabled={isDisable}
                    />
                    <Text> : </Text>
                    <Picker
                        onItemChange={handleEndMinuteChange}
                        item={endMinute}
                        items={endMinuteItems}
                        title="End Time"
                        placeholder="End"
                        isNullable={true}
                        style={styles.picker}
                        disabled={isDisable}
                    />
                </View>
                <Feather name="clock" size={24} color="#aaaaaa" />
            </View>
        </View>
    )
}

export default forwardRef(TimeSelector)

const styles = StyleSheet.create({
    timeSelectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 32
    },
    timeSelector: {
        flex: 0.45,
        backgroundColor: 'white',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14
    },
    pickerContainer: {
        flexGrow: 1,
        flexDirection: 'row'
    },
    picker: {
        flex: 1
    }
})
