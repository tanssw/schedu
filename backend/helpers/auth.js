const { v4: uuidv4 } = require('uuid')

const authSchema = require('../schema/authSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')
const authModel = conn.model('authentications', authSchema, process.env.AUTH_COLLECTION)

// Generate auth token, save it into the database and send token back
const generateAuthToken = async (userId) => {
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
        console.log('Error occured in genreateAuthToken() in auth.js')
    }

}

module.exports = {
    generateAuthToken
}