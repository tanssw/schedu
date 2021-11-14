import React from 'react'
import { LogBox } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import userReducer from './store/reducers/userReducer'

import AuthNavigator from './navigators/AuthNavigator'

// Disable Yellow box warning
LogBox.ignoreLogs(['AsyncStorage'])

export default function App() {

    const rootReducer = combineReducers({
        user: userReducer
    })

    const store = createStore(rootReducer)

    return (
        <Provider store={store}>
            <AuthNavigator />
        </Provider>
    )
}
