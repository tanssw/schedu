import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

import { colorCode } from '../../../styles'
const iconColor = colorCode.lightGrey

export default function QueryBar(props) {

    const onSelectFilter = (selector=null) => {
        props.onSelect(selector)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter()}}>
                <Ionicons name="ios-people-sharp" size={32} color={iconColor} />
                <Text style={[styles.optionText, styles.marginTopSmall]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter('professor')}}>
                <FontAwesome5 name="chalkboard-teacher" size={26} color={iconColor} />
                <Text style={[styles.optionText, styles.marginTopDefault]}>Professor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter('officer')}}>
                <FontAwesome5 name="id-card-alt" size={26} color={iconColor} />
                <Text style={[styles.optionText, styles.marginTopDefault]}>Officer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter('student')}}>
                <Ionicons name="school" size={32} color={iconColor} />
                <Text style={[styles.optionText, styles.marginTopSmall]}>Student</Text>
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
