import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

import { colorCode } from '../../../styles'
const iconColor = colorCode.lightGrey
const selectColor = colorCode.blue

export default function QueryBar(props) {

    const [selected, updateSelected] = useState(null)

    useEffect(() => {
        updateSelected(props.savedRole)
    }, [])

    const onSelectFilter = (selector) => {
        updateSelected(selector)
        props.onSelect(selector)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter(null)}}>
                <Ionicons name="ios-people-sharp" size={32} color={selected === null ? selectColor : iconColor} />
                <Text style={[styles.optionText, styles.marginTopSmall, { color: selected === null ? selectColor : iconColor }]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter('professor')}}>
                <FontAwesome5 name="chalkboard-teacher" size={26} color={selected === 'professor' ? selectColor : iconColor}/>
                <Text style={[styles.optionText, styles.marginTopDefault, { color: selected === 'professor' ? selectColor : iconColor }]}>Professor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter('officer')}}>
                <FontAwesome5 name="id-card-alt" size={26} color={selected === 'officer' ? selectColor : iconColor}/>
                <Text style={[styles.optionText, styles.marginTopDefault, { color: selected === 'officer' ? selectColor : iconColor }]}>Officer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter('student')}}>
                <Ionicons name="school" size={32} color={selected === 'student' ? selectColor : iconColor}/>
                <Text style={[styles.optionText, styles.marginTopSmall], { color: selected === 'student' ? selectColor : iconColor }}>Student</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    option: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    optionText: {
        textAlign: 'center',
        fontWeight: '300',
        color: colorCode.lightGrey
    },
    marginTopDefault: {
        marginTop: 8
    },
    marginTopSmall: {
        marginTop: 4
    }
})
