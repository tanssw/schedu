import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'

// style by tanssw.com
import { text, shadow } from '../../styles'

// import components
import UserData from './components/UserData'

export default function ProfileScreen({ navigation }) {
    const [userData, setUserData] = useState({
        _id: { $oid: '617be0c164389e9709ea96b0' },
        businessId: '62070077',
        firstName: 'thanakan',
        lastName: 'boonma',
        role: 'student',
        contact: { email: '62070077@it.kmitl.ac.th', tel: '0808080808' },
        image: 'https://lh3.googleusercontent.com/a/AATXAJwtwryT19EjwXDGUmiB_Y8C34GOlwfRu8S1dplb=s96-c',
        setting: {
            displayTel: true,
            weekendReceive: true,
            activeTime: { startAt: '8:30AM', endAt: '16:30AM' }
        }
    })

    const [newFirstName, setNewFirstName] = useState(userData.firstName)
    const [newLastName, setNewLastName] = useState(userData.lastName)
    const [newPhoneNumber, setNewPhoneNumber] = useState(userData.contact.tel)

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

    // const dispatch = useDispatch()

    // const update = () => {
    //     dispatch(
    //         updateData({
    //             firstName: newFirstName,
    //             lastName: newLastName,
    //             tel: newPhoneNumber
    //         })
    //     )

    //     alert('Profile Updated')
    //     navigation.navigate('Profile', {})
    // }

    return (
        <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
                <Image
                    style={styles.profileImage}
                    source={{
                        url: userData.image
                    }}
                />
                <View style={[styles.userProfileContainer, shadow.boxTopMedium]}>
                    <View style={styles.dataBlock}>
                        <Text style={styles.userProfileMenu}>General</Text>
                        <UserData
                            topicData={'First name'}
                            data={userData.firstName}
                            edit={true}
                            update={updateDataHandler}
                        />
                        <UserData
                            topicData={'Last name'}
                            data={userData.lastName}
                            edit={true}
                            update={updateDataHandler}
                        />

                        <UserData topicData={'Role'} data={userData.role} edit={false} />
                    </View>
                    <View style={styles.dataBlock}>
                        <Text style={styles.userProfileMenu}>Contact</Text>
                        <UserData topicData={'Email'} data={userData.contact.email} edit={false} />
                        <UserData
                            topicData={'Phone number'}
                            data={newPhoneNumber}
                            edit={true}
                            update={updateDataHandler}
                        />
                    </View>
                    <TouchableOpacity style={[styles.updateBtn]} onPress={update}>
                        <Text style={(text.blue, styles.updateBtnText)}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    // container styles
    container: {
        flex: 1,
        paddingTop: 32,
        alignItems: 'center'
    },
    userProfileContainer: {
        flex: 1,
        width: '100%',
        padding: 32,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: 'white'
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
