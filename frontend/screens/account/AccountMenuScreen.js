import React from "react";

import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

export default function AccountMenuScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* user profile image */}
            <Image
                style={styles.profileImage}
                source={{
                    url: "https://lh3.googleusercontent.com/a/AATXAJwtwryT19EjwXDGUmiB_Y8C34GOlwfRu8S1dplb=s96-c",
                }}
            ></Image>

            {/* user fullname */}
            <Text style={styles.userFullname}>Thanakan Boonma</Text>

            {/* user role */}
            <Text style={styles.userRole}>Student</Text>

            <View style={styles.userAccountNav}>
                {/* profile navigation */}
                <TouchableOpacity
                    style={styles.menuBtn}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text style={styles.menuText}>Profile / Contact</Text>
                </TouchableOpacity>

                {/* setting navigation */}
                <TouchableOpacity
                    style={styles.menuBtn}
                    onPress={() => navigation.navigate("Setting")}
                >
                    <Text style={styles.menuText}>Settings</Text>
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
    userAccountNav: {
        flex: 1,
        width: "100%",
        padding: 32,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: "#CCC",
        shadowColor: "black",
    },
    // image profile style
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 360,
        margin: 16,
    },
    // user data styles
    userFullname: {
        fontWeight: "bold",
        color: "darkblue",
    },
    userRole: {
        marginTop: 5,
        marginBottom: 40,
        color: "#AAA",
    },
    // menus styles
    menuBtn: {
        borderBottomColor: "#555",
        borderBottomWidth: 2,
        paddingTop: 20,
        paddingBottom: 20,
    },
    menuText: {
        fontWeight: "bold",
        color: "#555",
    },
});
