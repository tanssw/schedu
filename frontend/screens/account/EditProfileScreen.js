import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { AUTH_TOKEN_KEY, AUTH_USER_ID } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'
import axios from 'axios'

// style by tanssw.com
import { text, shadow } from '../../styles'

// import components
import UserData from './components/UserData'
export default function ProfileScreen({ route, navigation }) {
    const updateDataHandler = data => {
        switch (data.topic) {
            case 'First name':
                setNewFirstName(data.data)
                break
            case 'Last name':
                setNewLastName(data.data)
                break
            case 'Phone number':
                setNewPhoneNumber(data.data)
                break
        }
    }

    const update = async () => {
        const body = {
            id: AUTH_USER_ID,
            newData: {
                firstName: newFirstName,
                lastName: newLastName,
                contact: {
                    email: userData.contact.email,
                    tel: newPhoneNumber
                }
            }
        }

        const headers = {
            headers: { 'Schedu-Token': AUTH_TOKEN_KEY }
        }

        try {
            const user = await axios.put(`${API_SERVER_DOMAIN}/account/updateUser`, body, headers)
            setUserData(user.data)
        } catch (error) {
            console.log(error)
        }
        alert('Profile Updated')
        navigation.navigate('AccountMenuScreen')
    }

    const [userData, setUserData] = useState(route.params)
    const [newFirstName, setNewFirstName] = useState(userData.firstName)
    const [newLastName, setNewLastName] = useState(userData.lastName)
    const [newPhoneNumber, setNewPhoneNumber] = useState(userData.contact.tel)

    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={{
                    url: userData.image
                }}
            />
            <View style={[styles.editProfileContainer, shadow.boxTopMedium]}>
                <View>
                    <View style={styles.dataBlock}>
                        <Text style={styles.userProfileMenu}>General</Text>
                        <UserData
                            topicData={'First name'}
                            data={newFirstName}
                            edit={true}
                            update={updateDataHandler}
                        />
                        <UserData
                            topicData={'Last name'}
                            data={newLastName}
                            edit={true}
                            update={updateDataHandler}
                        />
                    </View>
                    <View style={styles.dataBlock}>
                        <Text style={styles.userProfileMenu}>Contact</Text>
                        <UserData
                            topicData={'Phone number'}
                            data={newPhoneNumber}
                            edit={true}
                            update={updateDataHandler}
                        />
                    </View>
                </View>
                <TouchableOpacity style={[styles.updateBtn]} onPress={update}>
                    <Text style={(text.blue, styles.updateBtnText)}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // container styles
    container: {
        flex: 1,
        paddingTop: 32,
        alignItems: 'center'
    },
    editProfileContainer: {
        flex: 1,
        width: '100%',
        padding: 32,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    dataBlock: {
        marginBottom: 32
    },
    // image profile style
    profileImage: {
        width: 100,
        height: 100,
        marginBottom: 32,
        borderRadius: 360
    },
    userProfileMenu: {
        fontWeight: 'bold',
        color: '#000'
    },
    updateBtn: {
        width: '100%',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#001e6a',
        alignItems: 'center'
    },
    updateBtnText: {
        fontWeight: 'bold'
    }
})
