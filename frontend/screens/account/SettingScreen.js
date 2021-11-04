import React from "react";
import { Text, View, StyleSheet, Switch } from "react-native";

// import components
import SettingData from "./components/SettingData";

export default function SettingScreen({ route, navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.dataBlock}>
                <Text style={styles.settingMenu}>Calendar</Text>
                <SettingData
                    topicData={"Active time"}
                    data={"08:30 AM - 04:30 PM"}
                    type={"date"}
                />
                <SettingData
                    topicData={"Receive weekend appointment"}
                    data={"false"}
                />
            </View>
            <View style={styles.dataBlock}>
                <Text style={styles.settingMenu}>Calendar</Text>
                <SettingData
                    topicData={"Display phone number"}
                    data={"false"}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "white"
    },
    settingMenu: {
        fontWeight: "bold",
        paddingLeft: 20,
    },
    dataBlock: {
        marginBottom: 20,
    },
});
