import React, { useState } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import { colorCode, shadow } from '../../styles'

import Information from './components/Information'

export default function ProfileScreen({ route, navigation, userData }) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={{
                    url: userData.image
                }}
            ></Image>
            <View style={[styles.userProfileContainer, shadow.boxTopMedium]}>
                <View style={styles.dataBlock}>
                    <Text style={styles.userProfileMenu}>General</Text>
                    <Information topicData="Fullname" data={`${userData.firstName} ${userData.lastName}`} edit={false} style={styles.topSection}/>
                    <Information topicData="Role" data={userData.role} edit={false} />
                </View>

                <View style={styles.dataBlock}>
                    <Text style={styles.userProfileMenu}>Contact</Text>
                    <Information topicData="Email" data={userData.contact.email} edit={false} style={styles.topSection} />
                    <Information topicData="Phone Number" data={userData.contact.tel} edit={false} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        alignItems: 'center'
    },
    userProfileContainer: {
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: 'white'
    },
    dataBlock: {
        marginBottom: 20
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 360,
        marginBottom: 32
    },
    userProfileMenu: {
        color: colorCode.blue,
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 24,
        marginTop: 32,
        marginBottom: 12
    },
    topSection: {
        borderTopWidth: 0.75,
        borderTopColor: colorCode.lighterGrey
    }
})
