const { v4: uuidv4 } = require('uuid')

const conn = require('../config/connectionMongoDB/ScheduConnect')
const authSchema = require('../schema/authSchema')
const authModel = conn.model('authentications', authSchema, process.env.AUTH_COLLECTION)

// Generate auth token, save it into the database and send token back
const generateAuthToken = async userId => {
    const document = {
        token: uuidv4(),
        userId: userId,
        createdAt: new Date()
    }

    const auth = new authModel(document)

    try {
        const result = await auth.save()
        return result.token
    } catch (error) {
        console.log('Error occured in generateAuthToken() in helper/auth.js')
        throw error
    }
}

// Delete authentication token
const deleteAuthToken = async token => {
    try {
        const result = await authModel.findOneAndDelete({ token: token })
    } catch (error) {
        throw error
    }
}

// Get user from authentication token
const getUserIdFromToken = async token => {
    try {
        const result = await authModel.findOne({ token: token })
        const userObjectId = result.userId
        return userObjectId
    } catch (error) {
        throw error
    }
}

module.exports = {
    generateAuthToken,
    deleteAuthToken,
    getUserIdFromToken
}
