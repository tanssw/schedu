import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View,TextInput,FlatList,TouchableOpacity} from "react-native";

import {
    AntDesign,
    Fontisto,
    FontAwesome,
    Ionicons,
  } from "@expo/vector-icons";

export default function QueryBar(){

    return(
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
    )
    function test() {
        alert("history");
      }
}
const styles = StyleSheet.create({
    queryTab: {
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
      TextIcon: {
        textAlign: "center",
      },
})