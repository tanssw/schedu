import React from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";

// style by tanssw.com
import { shadow } from "../../styles";

// import components
import UserData from "./components/UserData";

export default function ProfileScreen({route, navigation}) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={{
                    url: "https://lh3.googleusercontent.com/a/AATXAJwtwryT19EjwXDGUmiB_Y8C34GOlwfRu8S1dplb=s96-c",
                }}
            ></Image>
            <View style={[styles.userProfileContainer, shadow.boxTopMedium]}>
                <View style={styles.dataBlock}>
                    <Text style={styles.userProfileMenu}>General</Text>
                    <UserData topicData={"Name"} data={"Thanakan Boonma"}  edit={route.params.editState}/>
                    <UserData topicData={"Role"} data={"Student"} />
                </View>

                <View style={styles.dataBlock}>
                    <Text style={styles.userProfileMenu}>Contact</Text>
                    <UserData topicData={"Email"} data={"62070077@it.kmitl.ac.th"} />
                    <UserData topicData={"Phone number"} data={"0808080808"} />
                </View>
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
        borderRadius: 360,
        marginBottom: 32,
    },
    userProfileMenu: {
        fontWeight: "bold",
        color: "#000",
    },
});
