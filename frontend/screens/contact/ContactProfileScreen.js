import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView} from 'react-native'
import axios from 'axios';

export default function ContactProfileScreen({route, navigation}) {
    const {businessId} = route.params;

    const [profile, updateProfile] = useState([])
    const getQueryPeople = async () =>{
        const all = await axios.get(`http://localhost:3000/account/${businessId}`)
        updateProfile(all.data)
      }

    
      useEffect(() => {
        getQueryPeople()
      }, []);

    return (
        <SafeAreaView>
        <Text>Hello, Contact Profile Screen! : {JSON.stringify(profile)}</Text>
        </SafeAreaView>
    )
}