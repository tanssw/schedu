const express = require('express')

const accountSchema = require('../schema/accountSchema')
const conn = require('../config/connectionMongoDB/ScheduConnect')

const accountModel = conn.model('accounts', accountSchema, process.env.ACCOUNTS_COLLECTION)

const router = express()

// Get all users in mongoDB
router.get('/all', async(req, res) =>{
    const user = await accountModel.find({})
    res.json(user)
})
router.get('/role/:role', async(req,res) =>{
    const { role } = req.params
    const user = await accountModel.find({ role: role}).exec()
    res.json(user)
})
router.get('/search/:word', async(req, res) =>{
    const {word} = req.params
    const user = await accountModel.find({firstName: { $regex: '.*' + word + '.*' } }).limit(5)
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
// Get user by user object id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    const user = await accountModel.find({ businessId: id}).exec()
    res.json(user)
})


module.exports = router