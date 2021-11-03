const express = require('express');
const mongoose = require('mongoose')
const eventSchema = require('../Schema/eventSchema')
var conn = require('../config/connectionMongoDB/IT_CalendarConnect')
const router = express();

const eventModel = conn.model('event' , eventSchema, 'event')

//Get all event in mongoDB
router.get('/all', async(req, res) =>{
    const event = await eventModel.find({})
    res.json(event)
})
//Get event by event object id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    const event = await eventModel.findById(id)
    res.json(event)
})
//Add New event in mongoDB
router.post('/addEvent', async(req, res) =>{
    const payload = req.body
    const event = new eventModel(payload)
    await event.save()
    res.json({Message: "Success"})
})
//Update event in mongoDB
router.put('/updateEvent/:id', async(req, res) =>{
    const payload = req.body
    const { id } = req.params
    const event = await eventModel.findByIdAndUpdate(id, {$set: payload})
    res.json(event)

})
//Delete event in mongoDB
router.delete('/delEvent/:id', async(req, res) => {
    const { id } = req.params
    await eventModel.findByIdAndDelete(id)

    res.status(200).end()
})
module.exports = router