const { v4: uuidv4 } = require('uuid')

const authSchema = require('../schema/authSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')
const authModel = conn.model('authentications', authSchema, process.env.AUTH_COLLECTION)

const generateAuthToken = (userId) => {
    const document = {
        token: uuidv4(),
        userId: userId,
        createAt: null,
        expireAt: null
    }
    const auth = new authModel(document)
}

module.exports = {
    generateAuthToken
}