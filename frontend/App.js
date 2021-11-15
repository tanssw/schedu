import React from 'react'
import { LogBox, SafeAreaView, StyleSheet } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import userReducer from './store/reducers/userReducer'

import AuthNavigator from './navigators/AuthNavigator'
import { colorCode } from './styles'

// Disable Yellow box warning
LogBox.ignoreLogs(['AsyncStorage'])

export default function App() {

    const rootReducer = combineReducers({
        user: userReducer
    })

    const store = createStore(rootReducer)

    return (
        <>
            <SafeAreaView style={styles.safeArea} />
            <Provider store={store}>
                <AuthNavigator />
            </Provider>
        </>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colorCode.blue
    }
})