import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import {
    FontAwesome,
  } from "@expo/vector-icons";
import axios from 'axios';


export default function ContactHistoryScreen({route, navigation}) {

    const [participants, updateParticipants] = useState([]);
    const {businessId} = route.params;

    const getQueryHistory = async () =>{
        const all = await axios.get(`http://localhost:3000/account/${businessId}`)
        updateParticipants(all.data)
      }
      useEffect(() => {
        getQueryHistory()
      }, []);


    return (
    <View style={styles.ContactTab}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>History</Text>
      <View style={styles.listContainer}>
          {participants.map(({businessId, firstName, lastName, role}, index) => (
             <TouchableOpacity onPress={() => {navigation.navigate("ContactProfile" ,{ businessId: businessId })}}>
              <View style={styles.listItem} key={`${index}${businessId}`}>
              <FontAwesome 
                name="user-circle-o"
                size={44}
                color="grey"
                style={styles.personImage}
              />
              <View>
              <Text style={[styles.personName, styles.flex = 1]}>{firstName} {lastName}</Text>
              <Text style={[styles.personRole]}>{role}</Text>
              </View>
            </View>
            </TouchableOpacity>
          ))}
          
        </View>
        </View> 

    )
}
const styles = StyleSheet.create({
    participantContainer: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 20,
      },
      personName: {
        textAlign: "center",
        marginTop: 4,
      },
      personRole:{
        textAlign: 'left'
      },
      personImage: {
        textAlign: "center",
        marginVertical: 3,
        marginHorizontal: 20,
      },
      ContactTab:{
        // margin: 15,
        padding: 16
      },
      listContainer: {
        marginTop: 15,
        marginBottom: 20,
      },
      listItem:{
        flexDirection: 'row',
        margin: 5,
        marginBottom: 15,
        alignSelf: 'flex-start'
      },
})