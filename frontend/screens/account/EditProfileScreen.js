import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

// style by tanssw.com
import { text, shadow } from "../../styles";

// import components
import UserData from "./components/UserData";

export default function ProfileScreen({ navigation }) {
    const [newName, setNewName] = useState("Thanakan Boonma");
    const [newPoneNumber, setNewPhoneNumber] = useState("0812345678");

    const updateData = () => {
        alert("Profile Updated");
        navigation.navigate("Profile");
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={{
                    url: "https://lh3.googleusercontent.com/a/AATXAJwtwryT19EjwXDGUmiB_Y8C34GOlwfRu8S1dplb=s96-c",
                }}
            />
            <View style={[styles.userProfileContainer, shadow.boxTopMedium]}>
                <View style={styles.dataBlock}>
                    <Text style={styles.userProfileMenu}>General</Text>
                    <UserData
                        topicData={"Name"}
                        data={newName}
                        editState={true}
                    />
                    <UserData
                        topicData={"Role"}
                        data={"Student"}
                        editState={false}
                    />
                </View>
                <View style={styles.dataBlock}>
                    <Text style={styles.userProfileMenu}>Contact</Text>
                    <UserData
                        topicData={"Email"}
                        data={"62070077@it.kmitl.ac.th"}
                        editState={false}
                    />
                    <UserData
                        topicData={"Phone number"}
                        data={newPoneNumber}
                        editState={true}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.updateBtn]}
                    onPress={updateData}
                >
                    <Text style={(text.blue, styles.updateBtnText)}>
                        Update Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // container styles
    container: {
        flex: 1,
        paddingTop: 32,
        alignItems: "center",
    },
    userProfileContainer: {
        flex: 1,
        width: "100%",
        padding: 32,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: "white",
    },
    dataBlock: {
        marginBottom: 20,
    },
    // image profile style
    profileImage: {
        width: 100,
        height: 100,
        marginBottom: 32,
        borderRadius: 360,
    },
    userProfileMenu: {
        fontWeight: "bold",
        color: "#000",
    },
    updateBtn: {
        width: "100%",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#001e6a",
        alignItems: "center",
    },
    updateBtnText: {
        fontWeight: "bold",
    },
});
