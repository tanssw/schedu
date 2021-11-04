import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { SearchBar, Button } from "react-native-elements";
import { background } from "../../styles";
import { AntDesign, Ionicons, Fontisto } from "@expo/vector-icons"

export default function ContactListScreen() {
  const [search, updateSearch] = useState("");
  return (
    <View style={styles.searchTab}>
      <TextInput style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChange={updateSearch}
      />
      <Fontisto style={styles.icon} name="history" size={22} color="white" />
      <AntDesign style={styles.icon} name="staro" size={24} color="#DDA448" />
    </View>
    
    /* <SearchBar
            style={styles.searchBar}
        placeholder="search"
        onChangeText={updateSearch}
        value={search}
        platform="ios"
      >
      </SearchBar> */
  );
}

const styles = StyleSheet.create({
  searchTab: {
    flexDirection: "row",
    width: 400,
    height: 50,
    backgroundColor: "royalblue",
    justifyContent: 'flex-start'
    
  },
  searchBar: {
    height: 30,
    width: 250,
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 10,
    margin: 10,
    paddingLeft: 5
  },
  icon:{
    width: 30,
    margin: 10,
    marginTop: 12,
  }
});
