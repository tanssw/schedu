import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View,TextInput,TouchableOpacity, SafeAreaView} from "react-native";
import { SearchBar } from 'react-native-elements';
import { background } from '../../../styles'

import {
    AntDesign,
    Fontisto,
    FontAwesome,
  } from "@expo/vector-icons";


export default function SearchTab(props){

    const [search, updateSearch] = useState("");

    useEffect(() =>{
      
    }, [search])
    return(
        <SafeAreaView>
        <View
        style={[styles.searchTab, styles.backgroundColor = background.blue]}
      >
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onChange={props.closeUpper}
          onChangeText={updateSearch}
        />
        <TouchableOpacity onPress={props.searchWord}>
        <FontAwesome 
        style={styles.iconSearch}
        name="search" 
        size={24} 
        color="white" />
          </TouchableOpacity>
        <TouchableOpacity onPress={props.historyQuery}>
          <Fontisto
            style={styles.iconHistory}
            name="history"
            size={22}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPres={test}>
        <AntDesign
          style={styles.iconStart}
          name="staro"
          size={24}
          color="#DDA448"
        />
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    )
    function test() {
        alert("history");
      }
}
const styles = StyleSheet.create({
    searchTab: {
        flex:1,
        flexDirection: "row",
        padding: 10,
        justifyContent: "flex-start",
      },
      searchBar: {
        flex:1,
        height: 35,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 13,
      },
      iconHistory: {
        width: 30,
        margin: 10,
        // marginTop: 17,
        // marginLeft: 14,
        padding: 5,
        paddingTop: 10
      },
      iconStart: {
        width: 30,
        margin: 10,
        // marginLeft: 5,
        // marginTop: 16,
        padding: 5,
        paddingTop: 8
      },
      iconSearch: {
        width: 30,
        margin: 10,
        // marginLeft: 5,
        // marginTop: 16,
        padding: 5,
        paddingTop: 8
      },
})