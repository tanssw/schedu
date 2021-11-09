const userSchema = require('../schema/accountSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')
const userModel = conn.model('users', userSchema, process.env.USERS_COLLECTION)

DEFAULT_START_AT = '08:30'
DEFAULT_END_AT = '16:30'

// Create new user document into the user collection
const createNewUser = async (data) => {

    const emailAccount = data.email.split('@')[0]

    const isStudent = !isNaN(emailAccount)
    const businessId = isStudent ? emailAccount : ''
    const role = isStudent ? 'student' : 'teacher'

    const document = {
        googleId: data.id,
        businessId: businessId,
        firstName: data.givenName,
        lastName: data.familyName,
        role: role,
        contact: {
            email : data.email,
            tel: null
        },
        image: data.photoUrl,
        setting: {
            displayTel: false,
            weekendReceive: false,
            activeTime: {
                startAt : DEFAULT_START_AT,
                endAt: DEFAULT_END_AT
            }
        }
    }

    const user = new userModel(document)
    try {
        const result = await user.save()
        return result
    } catch (error) {
        console.log(`Error occured in createNewUser() of userDatabase.js`)
        throw error
    }
}

// Check if google id is already exist in the collection
const getUserByGoogleId = async (googleId) => {
    try {
        const user = await userModel.findOne({googleId: googleId})
        return user
    } catch (error) {
        console.log(`Error occured in isUserExist() of userDatabase.js`)
        throw error
    }
}

module.exports = {
    createNewUser,
    getUserByGoogleId
}