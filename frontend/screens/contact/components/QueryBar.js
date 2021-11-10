import React, { useEffect, useState } from "react";
import { StyleSheet,Text,View,TextInput,FlatList,TouchableOpacity} from "react-native";

import {
    AntDesign,
    Fontisto,
    FontAwesome,
    Ionicons,
  } from "@expo/vector-icons";

export default function QueryBar(props){

    return(
        <View style={styles.queryTab}>
        <TouchableOpacity onPress={all}>
          <Ionicons name="ios-people-sharp" size={50} color="black" />
          <Text style={styles.TextIcon}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={professor}>
          <Ionicons name="md-people-circle" size={50} color="black" />
          <Text style={[styles.TextIcon]}>Professor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={officer}>
        <Ionicons name="people-outline" size={50} color="black" />
          <Text style={styles.TextIcon}>Officer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={student}>
          <Ionicons name="ios-people-circle-outline" size={50} color="black" />
          <Text style={styles.TextIcon}>Student</Text>
        </TouchableOpacity>
      </View>
    )
    function all() {
        // alert("all");
        props.all()
      }
    function professor() {
        props.professor()
    }
    function officer(){
        props.officer()
    }
    function student(){
        props.student()
    }
}
const styles = StyleSheet.create({
    queryTab: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
      TextIcon: {
        textAlign: "center",
      },
})