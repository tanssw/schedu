import React, {useState} from "react";
import {View, ScrollView} from "react-native";

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchTab'
import QueryBar from "./components/QueryBar";
import ContactTab from "./components/ContactTab";

export default function ContactListScreen() {
    const [toggleSuggest, updateToggleSuggest] = useState(0)
    const [toggleQuery, updateToggleQuery] = useState(0)
    const getSearch = () => {
        alert("Search")
      };
    const getQueryPeople = (queryData) =>{
        alert("For parent" + queryData)
    }
    const suggestDisplay = () =>{
        if(toggleSuggest == 0){
            return (
                <SuggestBar/>
            )
        }
    }
    const queryDisplay = () =>{
        if(toggleQuery == 0){
            return (
                <QueryBar query={getQueryPeople}/>
            )
        }
    }
    const closeUpper = () =>{
        updateToggleSuggest(1)
        updateToggleQuery(1)
    }
  
  return (
    <ScrollView nestedScrollEnabled>
      {/* SearchBar tab*/}
      <SearchBar searchWord={getSearch} closeUpper={closeUpper}/>
      {/* Suggested Bar */}
        {/* <SuggestBar/> */}
        {suggestDisplay()}
      {/* queryTab */}
        {/* <QueryBar query={getQueryPeople}/> */}
        {queryDisplay()}
      {/* contact tab */}
      <ContactTab/>
    </ScrollView>
  );
}
