import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function ContactHistoryScreen() {
    const [participants, updateParticipants] = useState([
        {
            id: 1,
            business_id: '62070101',
            firstname: 'Nopphadon',
            lastname: 'Phanwong',
            role: 'Student'
        },
        {
            id: 2,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 3,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 4,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 5,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 6,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        },
        {
            id: 7,
            business_id: '62070074',
            firstname: 'Tasanai',
            lastname: 'Srisawat',
            role: 'Student'
        }
    ])

    return (
        <View style={styles.ContactTab}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Favorite</Text>
            {/* <View style={styles.listContainer}>
          {participants.map(({id, firstname, lastname, role}) => (
              <View style={styles.listItem} key={id}>
              <FontAwesome 
                name="user-circle-o"
                size={44}
                color="grey"
                style={styles.personImage}
              />
              <View>
              <Text style={[styles.personName, styles.flex = 1]}>{firstname}  {lastname}</Text>
              <Text style={[styles.personRole]}>{role}</Text>
              </View>
            </View>
          ))}
        </View> */}
        </View>
    )
}
const styles = StyleSheet.create({
    participantContainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 20
    },
    personName: {
        textAlign: 'center',
        marginTop: 4
    },
    personRole: {
        textAlign: 'left'
    },
    personImage: {
        textAlign: 'center',
        marginVertical: 3,
        marginHorizontal: 20
    },
    ContactTab: {
        // margin: 15,
        padding: 16
    },
    listContainer: {
        marginTop: 15,
        marginBottom: 20
    },
    listItem: {
        flexDirection: 'row',
        margin: 5,
        marginBottom: 15,
        alignSelf: 'flex-start'
    }
})
