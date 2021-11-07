import React, {useState} from "react";
import {View, ScrollView, SafeAreaView} from "react-native";

import SuggestBar from './components/SuggestBar'
import SearchBar from './components/SearchTab'
import QueryBar from "./components/QueryBar";
import ContactTab from "./components/ContactTab";

export default function ContactListScreen() {

    const [headerText, updateHeaderText] = useState("Contact")

    const [participants, updateParticipants] = useState([
        {
          id: 1,
          business_id: "62070101",
          firstname: "Nopphadon",
          lastname: "Phanwong",
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

    const [toggleSuggest, updateToggleSuggest] = useState(0)
    const [toggleQuery, updateToggleQuery] = useState(0)
    const getSearch = () => {
        alert("Search")
      };
    const getQueryPeople = (queryData) =>{
        alert("For parent" + queryData)
    }
    const historyQuery = () =>{
        updateHeaderText("History")
        closeUpper()
        
    }
    const StarQuery = () =>{
        alert("Star")
        // updateHeaderText("Favorite")
        // closeUpper()
        
    }
    // toggle display suggest and query bar 
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
        // updateToggleQuery(1)
    }
  
  return (
    <SafeAreaView>
    <ScrollView nestedScrollEnabled>
      {/* SearchBar tab*/}
      <SearchBar searchWord={getSearch} closeUpper={closeUpper} historyQuery={historyQuery} StarQuery={StarQuery}/>
      {/* Suggested Bar */}
        {/* <SuggestBar/> */}
        {suggestDisplay()}
      {/* queryTab */}
        {/* <QueryBar query={getQueryPeople}/> */}
        {queryDisplay()}
      {/* contact tab */}
      <ContactTab  participants={participants} headerText={headerText} />
    </ScrollView>
    </SafeAreaView>
  );
}
