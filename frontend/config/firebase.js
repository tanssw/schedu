import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import Constants from 'expo-constants'

const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
    measurementId: Constants.manifest.extra.measurementId
}

initializeApp(firebaseConfig)

const auth = getAuth()

export { auth }