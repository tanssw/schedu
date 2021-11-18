import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

import { colorCode } from '../../../styles'
const iconColor = colorCode.lightGrey
const selectColor = colorCode.blue

export default function QueryBar(props) {
    const [selectedAll, setSelectedAll] = useState(true)
    const [selectedProfessor, setSelectedProfessor] = useState(false) 
    const [selectedOfficer, setSelectedOfficer] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(false) 
    const onSelectFilter = (selector=null) => {
        props.onSelect(selector)
        
    }
    const clearSelection = () =>{
        setSelectedAll(false)
        setSelectedProfessor(false)
        setSelectedOfficer(false)
        setSelectedStudent(false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter(), clearSelection() ,setSelectedAll(true)}}>
                <Ionicons name="ios-people-sharp" size={32} color={selectedAll? selectColor : iconColor} />
                <Text style={[styles.optionText, styles.marginTopSmall, { color: selectedAll? selectColor : iconColor }]}  >All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter('professor'), clearSelection() ,setSelectedProfessor(true)}}>
                <FontAwesome5 name="chalkboard-teacher" size={26} color={selectedProfessor? selectColor : iconColor}/>
                <Text style={[styles.optionText, styles.marginTopDefault, { color: selectedProfessor ? selectColor : iconColor }]}  >Professor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter('officer'), clearSelection() ,setSelectedOfficer(true)}}>
                <FontAwesome5 name="id-card-alt" size={26} color={selectedOfficer? selectColor : iconColor}/>
                <Text style={[styles.optionText, styles.marginTopDefault, { color: selectedOfficer ? selectColor : iconColor }]}>Officer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => {onSelectFilter('student'),  clearSelection() ,setSelectedStudent(true)}}>
                <Ionicons name="school" size={32} color={selectedStudent? selectColor : iconColor}/>
                <Text style={[styles.optionText, styles.marginTopSmall], { color: selectedStudent ? selectColor : iconColor }}>Student</Text>
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
