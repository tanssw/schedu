import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View,TextInput,FlatList,TouchableOpacity} from "react-native";

import {
  AntDesign,
  Fontisto,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchBar'
import QueryBar from "./components/QueryBar";

export default function ContactListScreen() {

    const [participants, updateParticipants] = useState([
        {
          id: 1,
          business_id: "62070074",
          firstname: "Tasanai",
          lastname: "Srisawat",
          role: "Student"
        },
        {
          id: 2,
          business_id: "62070074",
          firstname: "Tasanai",
          lastname: "Srisawat",
          role: "Student"
        },
        {
          id: 3,
          business_id: "62070074",
          firstname: "Tasanai",
          lastname: "Srisawat",
          role: "Student"
        },
        {
          id: 4,
          business_id: "62070074",
          firstname: "Tasanai",
          lastname: "Srisawat",
          role: "Student"
        },
        {
            id: 5,
            business_id: "62070074",
            firstname: "Tasanai",
            lastname: "Srisawat",
            role: "Student"
          },
          {
            id: 6,
            business_id: "62070074",
            firstname: "Tasanai",
            lastname: "Srisawat",
            role: "Student"
          },
          {
            id: 7,
            business_id: "62070074",
            firstname: "Tasanai",
            lastname: "Srisawat",
            role: "Student"
          },
      ]);
  const renderParticipantList = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <FontAwesome 
          name="user-circle-o"
          size={44}
          color="grey"
          style={styles.personImage}
        />
        <View>
        <Text style={[styles.personName, styles.flex = 1]}>{item.firstname} {item.lastname}</Text>
        <Text style={[styles.personRole]}>{item.role}</Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      {/* SearchBar tab*/}
      <SearchBar/>
      {/* Suggested Bar */}
        <SuggestBar/>
      {/* queryTab */}
        <QueryBar/>
      {/* contact tab */}
      <View style={styles.ContactTab}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Contact</Text>
      <View style={styles.listContainer}>
          <FlatList
            data={participants}
            renderItem={renderParticipantList}
            keyExtractor={(person) => person.id}
            horizontal={false}
            inverted={true}
          />
        </View>
        </View> 
    </View>
  );
  function test() {
    alert("history");
  }
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
    margin: 15,
  },
  listContainer: {
    // flexDirection: "row",
    marginTop: 15,
    marginBottom: 20,
  },
  listItem:{
    flexDirection: 'row',
    margin: 5,
    marginBottom: 15,
    alignSelf: 'flex-start'
  },
});
