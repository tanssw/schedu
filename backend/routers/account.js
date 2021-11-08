const express = require('express')
const axios = require('axios')

const { isAllowEmailDomain } = require('../validators/authValidator')

const usersSchema = require('../schema/usersSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')

const userModel = conn.model('users', usersSchema, process.env.USERS_COLLECTION)

const router = express()

// Account Authentication with Google Sign-in
router.post('/auth', async (req, res) => {
    const authData = req.body
    const emailDomain = authData.user.email.split('@')[1]

    if (!isAllowEmailDomain(emailDomain)) res.status(400)

    try {
        const tokenResult = await axios.post(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${authData.accessToken}`)
        const tokenData = tokenResult.data

        // If user id in token data not match with requested one, then reject it.
        if (tokenData.user_id !== authData.user.id) res.status(400).send({error: 'Authentication ID not match.'})

        //

        res.json({
            user: 'test'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({error: 'Authentication Error'})
    }

})

/* -------------------------- INACTIVE ROUTES -------------------------- */

// Get all users in mongoDB
router.get('/all', async(req, res) =>{
    const user = await userModel.find({})
    res.json(user)
})
// Get user by user object id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    const user = await userModel.findById(id)
    res.json(user)
})
// Add New user in mongoDB
router.post('/addUser', async(req, res) =>{
    const payload = req.body
    const user = new userModel(payload)
    await user.save()
    res.json({Message: "Success"})
})
// Update user in mongoDB
router.put('/updateUser/:id', async(req, res) =>{
    const payload = req.body
    const { id } = req.params
    const user = await userModel.findByIdAndUpdate(id, {$set: payload})
    res.json(user)

})
// Delete user in mongoDB
router.delete('/delUser/:id', async(req, res) => {
    const { id } = req.params
    await userModel.findByIdAndDelete(id)
    res.json({message: "Delete user"})

    res.status(200).end()
})


module.exports = router