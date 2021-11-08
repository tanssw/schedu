import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "./../../store/actions/userAction";

// style by tanssw.com
import { text, shadow } from "../../styles";

// import components
import UserData from "./components/UserData";

export default function ProfileScreen({ navigation }) {
    const userData = useSelector((state) => state.user.userData);

    const [newFirstName, setNewFirstName] = useState(userData.firstName);
    const [newLastName, setNewLastName] = useState(userData.lastName);
    const [newPhoneNumber, setNewPhoneNumber] = useState(userData.contact.tel);

    const updateDataHandler = (data) => {
        switch (data.topic) {
            case "First name":
                setNewFirstName(data.data);
                break;
            case "Last name":
                setNewLastName(data.data);
                break;
            case "Phone number":
                setNewPhoneNumber(data.data);
                break;
        }
        console.log(data);
    };

    const dispatch = useDispatch();

    const update = () => {
        dispatch(
            updateData({
                firstName: newFirstName,
                lastName: newLastName,
                tel: newPhoneNumber,
            })
        );

        alert("Profile Updated");
        navigation.navigate("AccountMenuScreen");
    };

    // const updateDataWithApi = () => {

    // }

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <Image
                    style={styles.profileImage}
                    source={{
                        url: userData.image,
                    }}
                />
                <View
                    style={[styles.userProfileContainer, shadow.boxTopMedium]}
                >
                    <View style={styles.dataBlock}>
                        <Text style={styles.userProfileMenu}>General</Text>
                        <UserData
                            topicData={"First name"}
                            data={userData.firstName}
                            editState={true}
                            update={updateDataHandler}
                        />
                        <UserData
                            topicData={"Last name"}
                            data={userData.lastName}
                            editState={true}
                            update={updateDataHandler}
                        />

                        <UserData
                            topicData={"Role"}
                            data={userData.role}
                            editState={false}
                        />
                    </View>
                    <View style={styles.dataBlock}>
                        <Text style={styles.userProfileMenu}>Contact</Text>
                        <UserData
                            topicData={"Email"}
                            data={userData.contact.email}
                            editState={false}
                        />
                        <UserData
                            topicData={"Phone number"}
                            data={newPhoneNumber}
                            editState={true}
                            update={updateDataHandler}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.updateBtn]}
                        onPress={update}
                    >
                        <Text style={(text.blue, styles.updateBtnText)}>
                            Update Profile
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        marginBottom: 32,
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
