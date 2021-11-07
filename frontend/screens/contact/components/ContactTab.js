import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View,TextInput,FlatList,TouchableOpacity} from "react-native";

import {
  FontAwesome,
} from "@expo/vector-icons";


export default function ContactTab(props){

    const [headerText, updateHeaderText] = useState("Contact")


    return(
      <View style={styles.ContactTab}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{props.headerText}</Text>
      <View style={styles.listContainer}>
          {props.participants.map(({id, firstname, lastname, role}) => (
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