import React from "react"
import { Text, View, StyleSheet, Image } from "react-native"

// Redux
import { useSelector } from "react-redux"

// style by tanssw.com
import { shadow } from "../../styles"

// import components
import UserData from "./components/UserData"

export default function ProfileScreen() {
    const userData = useSelector((state) => state.user.userData)

    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={{
                    url: userData.image,
                }}
            ></Image>
            <View style={[styles.userProfileContainer, shadow.boxTopMedium]}>
                <View style={styles.dataBlock}>
                    <Text style={styles.userProfileMenu}>General</Text>
                    <UserData
                        topicData={"Name"}
                        data={userData.firstName + " " + userData.lastName}
                        edit={false}
                    />
                    <UserData
                        topicData={"Role"}
                        data={userData.role}
                        edit={false}
                    />
                </View>

                <View style={styles.dataBlock}>
                    <Text style={styles.userProfileMenu}>Contact</Text>
                    <UserData
                        topicData={"Email"}
                        data={userData.contact.email}
                        edit={false}
                    />
                    <UserData
                        topicData={"Phone number"}
                        data={userData.contact.tel}
                        edit={false}
                    />
                </View>
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
})
