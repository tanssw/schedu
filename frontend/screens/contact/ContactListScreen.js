import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { background, colorCode } from "../../styles";
import {
  AntDesign,
  Fontisto,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

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
  const renderParticipant = ({ item }) => {
    return (
      <View>
        <FontAwesome
          name="user-circle-o"
          size={44}
          color="grey"
          style={styles.personImage}
        />
        <Text style={styles.personName}>{item.firstname}</Text>
      </View>
    );
  };
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

  const [search, updateSearch] = useState("");
  return (
    <View>
      {/* SearchBar tab*/}
      <View
        style={[styles.searchTab, (styles.backgroundColor = background.blue)]}
      >
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={search}
          onChange={updateSearch}
        />
        <TouchableOpacity onPress={test}>
          <Fontisto
            style={styles.iconHistory}
            name="history"
            size={22}
            color="white"
          />
        </TouchableOpacity>
        <AntDesign
          style={styles.iconStart}
          name="staro"
          size={24}
          color="#DDA448"
        />
      </View>
      {/* Suggested Bar */}
      <View style={styles.suggestTab}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Suggested</Text>
        <View style={styles.participantContainer}>
          <FlatList
            horizontal
            data={participants}
            renderItem={renderParticipant}
            keyExtractor={(person) => person.id}
          />
        </View>
      </View>
      {/* queryTab */}
      <View style={styles.queryTab}>
        <TouchableOpacity onPress={test}>
          <Ionicons name="ios-people-sharp" size={50} color="black" />
          <Text style={styles.TextIcon}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={test}>
          <Ionicons name="md-people-circle" size={50} color="black" />
          <Text style={[styles.TextIcon]}>Professor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={test}>
        <Ionicons name="people-outline" size={50} color="black" />
          <Text style={styles.TextIcon}>Officer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={test}>
          <Ionicons name="ios-people-circle-outline" size={50} color="black" />
          <Text style={styles.TextIcon}>Student</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ContactTab}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Contact</Text>
      <View style={styles.listContainer}>
          <FlatList
            data={participants}
            renderItem={renderParticipantList}
            keyExtractor={(person) => person.id}
            horizontal={false}
            getItemLayout={(data, index) => (
                {length: 50, offset: 50 * index, index}
              )}
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
  searchTab: {
    flexDirection: "row",
    width: 400,
    height: 55,
    // backgroundColor: background.blue,
    justifyContent: "flex-start",
  },
  searchBar: {
    height: 30,
    width: 270,
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 10,
    margin: 13,
    paddingLeft: 5,
  },
  iconHistory: {
    width: 30,
    margin: 10,
    marginTop: 17,
    marginLeft: 14,
  },
  iconStart: {
    width: 30,
    marginLeft: 5,
    marginTop: 16,
  },
  suggestTab: {
    margin: 15,
  },
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
  queryTab: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  TextIcon: {
    textAlign: "center",
  },
  ContactTab:{
    margin: 15,
  },
  listContainer: {
    flexDirection: "row",
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
