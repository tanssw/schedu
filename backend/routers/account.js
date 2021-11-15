const express = require('express')

const accountSchema = require('../schema/accountSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')

const accountModel = conn.model('accounts', accountSchema, process.env.ACCOUNTS_COLLECTION)
const {authMiddleware}= require('../middlewares/auth')

const router = express()

// Get all users except myself from database
router.get('/all', authMiddleware, async (req, res) => {

    const role = req.query.role

    try {
        const userId = req.headers['schedu-uid']
        // Find all user except the one that user id equal to userId
        let users
        if (role) users = await accountModel.find({_id: {$ne: userId}, role: role})
        else users = await accountModel.find({_id: {$ne: userId}})
        res.json({users: users})
    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again.'})
    }
})

router.get('/search/:word', async (req, res) => {
    const { word } = req.params
    const user = await accountModel.find({ firstName: { $regex: '.*' + word + '.*' } }).limit(5)
    res.json(user)
})

// Add New user in mongoDB
router.post('/addUser', async (req, res) => {
    const payload = req.body
    const user = new accountModel(payload)
    await user.save()
    res.json({ Message: 'Success' })
})

// Update user in mongoDB
router.put('/updateUser/:id', async (req, res) => {
    const payload = req.body
    const { id } = req.params
    const user = await accountModel.findByIdAndUpdate(id, { $set: payload })
    res.json(user)
})

// Delete user in mongoDB
router.delete('/delUser/:id', async (req, res) => {
    const { id } = req.params
    await accountModel.findByIdAndDelete(id)
    res.json({ message: 'Delete user' })

    res.status(200).end()
})

// Get user by user object id
router.get('/user/:objectId', async (req, res) => {
    const { objectId } = req.params
    const user = await accountModel.find({ _id: objectId }).exec()
    res.json(user)
})

//Get all favorite users for they userId
router.get('/favorite/:id', authMiddleware, async (req, res) =>{
    const id = req.params.id
    const favoriteList = await accountModel.findOne({_id : id}).select({favorite: {$elemMatch: {_id: id}}})
    res.json(favoriteList)

})

// Get user information from User ID
router.get('/:userId', authMiddleware, async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await accountModel.findOne({ _id: userId })
        res.json({user: user})
    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Pleases try again.'})
    }
})


module.exports = router
