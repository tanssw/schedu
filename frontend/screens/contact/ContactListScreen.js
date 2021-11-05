import React from "react";
import {View, ScrollView} from "react-native";

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchBar'
import QueryBar from "./components/QueryBar";
import ContactTab from "./components/ContactTab";

export default function ContactListScreen() {

  
  return (
    <ScrollView nestedScrollEnabled>
      {/* SearchBar tab*/}
      <SearchBar/>
      {/* Suggested Bar */}
        <SuggestBar/>
      {/* queryTab */}
        <QueryBar/>
      {/* contact tab */}
      <ContactTab/>
    </ScrollView>
  );
}
