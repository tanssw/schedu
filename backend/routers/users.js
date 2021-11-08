const express = require('express')

const { getAuth, signInWithCustomToken } = require('firebase/auth')

const usersSchema = require('../schema/usersSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')
const { isAllowEmailDomain } = require('../validators/authValidator')

const userModel = conn.model('users', usersSchema, process.env.USERS_COLLECTION)

const router = express()

router.post('/auth', (req, res) => {
    const authData = req.body

    console.log(authData) // TODO: Remove

    const emailDomain = authData.email.split('@')[1]
    if (!isAllowEmailDomain(emailDomain)) res.status(400).json({message: 'This Google Account has no permission to use the system.'})

    const auth = getAuth()
    signInWithCustomToken()

    res.json({'message': 'received!'})
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