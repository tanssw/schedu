import React, { useRef, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'

import { getAuthAsset, clearAuthAsset, checkExpiredToken } from '../../modules/auth'
import { API_SERVER_DOMAIN } from '../../modules/apis'
import axios from 'axios'

// style by tanssw.com
import { text, shadow, colorCode } from '../../styles'

// import components
import Information from './components/Information'
export default function ProfileScreen({ route, navigation, userData, onProfileUpdated }) {

    const scrollViewRef = useRef()

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
        const { token, userId } = await getAuthAsset()

        const body = {
            id: userId,
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
            headers: { 'Schedu-Token': token }
        }

        try {
            const userResult = await axios.put(`${API_SERVER_DOMAIN}/account/`, body, headers)
            const updatedProfile = userResult.data.user
            onProfileUpdated(updatedProfile)
            alert('Your profile has been updated.')
            return navigation.navigate('Profile')
        } catch (error) {
            if (checkExpiredToken(error)) {
                await clearAuthAsset()
                return navigation.navigate('SignIn')
            }
            alert('Error occured during update.')
        }
    }

    const updateRequest = () => {
        Alert.alert(
            'Confirm your update',
            'Your profile will be changed after this update',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Update', style: 'default', onPress: () => {update()}}
            ]
        )
    }

    const [newFirstName, setNewFirstName] = useState(userData.firstName)
    const [newLastName, setNewLastName] = useState(userData.lastName)
    const [newPhoneNumber, setNewPhoneNumber] = useState(userData.contact.tel)

    return (
        <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})} contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.profileImage} source={{ url: userData.image }} />
            </View>
            <View style={[styles.editProfileContainer, shadow.boxTopMedium]}>
                <View>
                    <View style={styles.dataBlock}>
                        <Text style={styles.userProfileMenu}>General</Text>
                        <Information
                            topicData='First name'
                            data={newFirstName}
                            edit={true}
                            update={updateDataHandler}
                            style={styles.topSection}
                            keyboard='default'
                        />
                        <Information
                            topicData={'Last name'}
                            data={newLastName}
                            edit={true}
                            update={updateDataHandler}
                            keyboard='default'
                        />
                    </View>
                    <View style={styles.dataBlock}>
                        <Text style={styles.userProfileMenu}>Contact</Text>
                        <Information
                            topicData='Phone number'
                            data={newPhoneNumber}
                            edit={true}
                            update={updateDataHandler}
                            style={styles.topSection}
                            keyboard='phone-pad'
                            last={true}
                        />
                    </View>
                </View>
                <View style={styles.updateBtnContainer}>
                    <TouchableOpacity style={[styles.updateBtn]} onPress={updateRequest}>
                        <Text style={(text.blue, styles.updateBtnText)}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center'
    },
    imageContainer: {
        padding: 16,
        marginVertical: 24,
        alignItems: 'center'
    },
    editProfileContainer: {
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    dataBlock: {
        marginBottom: 32
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 512
    },
    userProfileMenu: {
        fontWeight: 'bold',
        color: colorCode.blue,
        fontSize: 16,
        paddingHorizontal: 24,
        marginTop: 32,
        marginBottom: 12
    },
    updateBtnContainer: {
        padding: 24
    },
    updateBtn: {
        width: '100%',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colorCode.blue,
        alignItems: 'center'
    },
    updateBtnText: {
        fontWeight: '300',
        fontSize: 16,
        color: colorCode.blue
    },
    topSection: {
        borderTopWidth: 0.75,
        borderTopColor: colorCode.lighterGrey
    }
})
