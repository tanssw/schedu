const express = require('express')

const accountSchema = require('../schema/accountSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')

const { isAllowEmailDomain } = require('../validators/authValidator')
const { getTokenData } = require('../helpers/googleApis')
const { createNewUser, getUserByGoogleId } = require('../helpers/account')
const { generateAuthToken } = require('../helpers/auth')

const accountModel = conn.model('accounts', accountSchema, process.env.ACCOUNTS_COLLECTION)

const router = express()

// Account Authentication with Google Sign-in
router.post('/auth', async (req, res) => {
    const authData = req.body
    const emailDomain = authData.user.email.split('@')[1]

    if (!isAllowEmailDomain(emailDomain)) res.status(400).send({error: 'This account has no permission to perform the authentication.'})

    try {
        const tokenData = await getTokenData(authData.accessToken)

        // If user id in token data not match with requested one, then reject it
        if (tokenData.user_id !== authData.user.id) res.status(400).send({error: 'Authentication ID not match.'})

        // If not user inside the collection then create one and response back the user data
        let user = await getUserByGoogleId(authData.user.id)
        if (user == null) user = await createNewUser(authData.user)

        generateAuthToken()

        res.json({user: user, token: ''})

    } catch (error) {
        console.log(error)
        res.status(400).send({error: 'Authentication Error'})
    }

})

/* -------------------------- INACTIVE ROUTES -------------------------- */

// Get all users in mongoDB
router.get('/all', async(req, res) =>{
    const user = await accountModel.find({})
    res.json(user)
})
// Get user by user object id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    const user = await accountModel.findById(id)
    res.json(user)
})
// Add New user in mongoDB
router.post('/addUser', async(req, res) =>{
    const payload = req.body
    const user = new accountModel(payload)
    await user.save()
    res.json({Message: "Success"})
})
// Update user in mongoDB
router.put('/updateUser/:id', async(req, res) =>{
    const payload = req.body
    const { id } = req.params
    const user = await accountModel.findByIdAndUpdate(id, {$set: payload})
    res.json(user)

})
// Delete user in mongoDB
router.delete('/delUser/:id', async(req, res) => {
    const { id } = req.params
    await accountModel.findByIdAndDelete(id)
    res.json({message: "Delete user"})

    res.status(200).end()
})


module.exports = router