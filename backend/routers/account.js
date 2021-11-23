const express = require('express')

const accountSchema = require('../schema/accountSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')

const { authMiddleware } = require('../middlewares/auth')
const { formatAccountInformation } = require('../helpers/account')

const accountModel = conn.model('accounts', accountSchema, process.env.ACCOUNTS_COLLECTION)

const router = express()

// Get all users except myself from database
router.get('/all', authMiddleware, async (req, res) => {
    const role = req.query.role

    try {
        const userId = req.headers['schedu-uid']
        // Find all user except the one that user id equal to userId
        let users
        if (role) users = await accountModel.find({ _id: { $ne: userId }, role: role })
        else users = await accountModel.find({ _id: { $ne: userId } })
        res.json({ users: users })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong. Please try again.' })
    }
})

// To search with firstname or lastname
router.get('/search', authMiddleware, async (req, res) => {
    try {
        const { word } = req.query
        const user = await accountModel.find({
            $or: [{ firstName: { $regex: word } }, { lastName: { $regex: word } }]
        })
        res.json({ result: user })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong. Please try again later.' })
    }
})

// Get user information from User ID
router.get('/:userId', authMiddleware, async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await accountModel.findOne({ _id: userId })
        const formattedUser = formatAccountInformation(user)
        res.json({ user: formattedUser })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong. Pleases try again.' })
    }
})

// Update user information
router.put('/', authMiddleware, async (req, res) => {
    try {
        const id = req.body.id
        const payload = req.body.newData
        const updatedUser = await accountModel.findByIdAndUpdate(
            id,
            { $set: payload },
            { new: true }
        )
        res.json({ user: updatedUser })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong. Please try again later.' })
    }
})

module.exports = router
