const accountSchema = require('../schema/accountSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')
const accountModel = conn.model('accounts', accountSchema, process.env.ACCOUNTS_COLLECTION)

DEFAULT_START_AT = '08:30'
DEFAULT_END_AT = '16:30'

// Create new user document into the user collection
const createNewUser = async data => {
    const emailAccount = data.email.split('@')[0]

    const isStudent = !isNaN(emailAccount)
    const businessId = isStudent ? emailAccount : ''
    const role = isStudent ? 'student' : 'professor'

    const document = {
        googleId: data.id,
        businessId: businessId,
        firstName: data.givenName,
        lastName: data.familyName,
        role: role,
        contact: {
            email: data.email,
            tel: null
        },
        image: data.photoUrl,
        setting: {
            displayTel: false,
            weekendReceive: false,
            activeTime: {
                startAt: DEFAULT_START_AT,
                endAt: DEFAULT_END_AT
            }
        }
    }

    const user = new accountModel(document)
    try {
        const result = await user.save()
        return result
    } catch (error) {
        console.log(`Error occured in createNewUser() of helper/user.js`)
        throw error
    }
}

// Check if google id is already exist in the collection
const getUserByGoogleId = async googleId => {
    try {
        const user = await accountModel.findOne({ googleId: googleId })
        return user
    } catch (error) {
        console.log(`Error occured in getUserByGoogleId() of helper/user.js`)
        throw error
    }
}

// Get user data from its own object id
const getUserByObjectId = async objectId => {
    try {
        const user = await accountModel.findOne({ _id: objectId })
        return user
    } catch (error) {
        console.log(`Error occured in getUserByObjectId() of helper/user.js`)
        throw error
    }
}

const formatAccountInformation = account => {
    const { displayTel } = account.setting
    if (!displayTel) account.contact.tel = null
    return account
}

module.exports = {
    createNewUser,
    getUserByGoogleId,
    getUserByObjectId,
    formatAccountInformation
}
