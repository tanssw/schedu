import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View,TextInput,TouchableOpacity, SafeAreaView} from "react-native";
import { background } from '../../../styles'

import {
    AntDesign,
    Fontisto,
  } from "@expo/vector-icons";


export default function SearchBar(){

    const [search, updateSearch] = useState("");

    return(
        <SafeAreaView>
        <View
        style={[styles.searchTab, styles.backgroundColor = background.blue]}
      >
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
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
      </SafeAreaView>
    )
    function test() {
        alert("history");
      }
}
const styles = StyleSheet.create({
    searchTab: {
        flexDirection: "row",
        width: 400,
        height: 55,
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
})