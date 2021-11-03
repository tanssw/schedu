import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={{
                    url: "https://lh3.googleusercontent.com/a/AATXAJwtwryT19EjwXDGUmiB_Y8C34GOlwfRu8S1dplb=s96-c",
                }}
            ></Image>
            <View style={styles.userProfileContainer}>
                <Text style={styles.userProfileMenu}>General</Text>
                <Text style={styles.TextComponentStyle}>Name</Text>
                <Text style={styles.userProfileMenu}>Contact</Text>
            </View>
        </View>
    )
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
        marginBottom: 16,
    },
    // menus styles
    menuBtn: {
        borderBottomColor: "#555",
        borderBottomWidth: 2,
        paddingTop: 20,
        paddingBottom: 20,
    },
    userProfileMenu: {
        fontWeight: "bold",
        color: "#000",
    },

    TextComponentStyle: {
        borderWidth: 2,
        borderColor:"#000" ,
        color: "#555",
        padding : 2,
        fontSize: 20,
        margin: 10
      }
});