import * as SecureStore from 'expo-secure-store'

const AUTH_TOKEN_KEY = 'authtoken'
const AUTH_USER_ID = 'uid'

const getAuthAsset = async () => {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
    const userId = await SecureStore.getItemAsync(AUTH_USER_ID)
    if (token && userId) return { token, userId }
    throw "No Authentication found"
}

const setAuthAsset = async (token, uid) => {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token)
    await SecureStore.setItemAsync(AUTH_USER_ID, uid)
}

const clearAuthAsset = async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY, {})
    await SecureStore.deleteItemAsync(AUTH_USER_ID, {})
}

const checkExpiredToken = (error) => {
    try {
        const status = error.response.status
        if (status !== 403) return false
        return true
    } catch (innerError) {
        return false
    }
}

export {
    AUTH_TOKEN_KEY,
    AUTH_USER_ID,
    getAuthAsset,
    setAuthAsset,
    clearAuthAsset,
    checkExpiredToken
}