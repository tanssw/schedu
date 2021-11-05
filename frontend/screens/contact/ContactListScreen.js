import React from "react";
import {View} from "react-native";

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchBar'
import QueryBar from "./components/QueryBar";
import ContactTab from "./components/ContactTab";

export default function ContactListScreen() {

  
  return (
    <View>
      {/* SearchBar tab*/}
      <SearchBar/>
      {/* Suggested Bar */}
        <SuggestBar/>
      {/* queryTab */}
        <QueryBar/>
      {/* contact tab */}
      <ContactTab/>
    </View>
  );
}
