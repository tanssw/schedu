const express = require('express')

const notificationSchema = require('../schema/notificationSchema')
var conn = require('../config/connectionMongoDB/ScheduConnect')

const router = express()

const notiModel = conn.model('notifications', notificationSchema, process.env.NOTIFICATIONS_COLLECTION)

//Get all noti in mongoDB
router.get('/all', async(req, res) =>{
    const noti = await notiModel.find({})
    res.json(noti)
})
//Get noti by noti object id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    const noti = await notiModel.findById(id)
    res.json(noti)
})
//Add New noti in mongoDB
router.post('/addNoti', async(req, res) =>{
    const payload = req.body
    const noti = new notiModel(payload)
    await noti.save()
    res.json({Message: "Success"})
})
//Update noti in mongoDB
router.put('/updateNoti/:id', async(req, res) =>{
    const payload = req.body
    const { id } = req.params
    const noti = await notiModel.findByIdAndUpdate(id, {$set: payload})
    res.json(noti)

})
//Delete noti in mongoDB
router.delete('/delNoti/:id', async(req, res) => {
    const { id } = req.params
    await notiModel.findByIdAndDelete(id)
    res.json({message: "Delete noti"})

    res.status(200).end()
})


module.exports = router