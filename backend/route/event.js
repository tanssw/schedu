const express = require('express');
const eventSchema = require('../models/eventSchema')
const router = express();

//Get all event in mongoDB
router.get('/all', async(req, res) =>{
    const event = await eventSchema.find({})
    res.json(event)
})
//Get event by event object id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    const event = await eventSchema.findById(id)
    res.json(event)
})
//Add New event in mongoDB
router.post('/addEvent', async(req, res) =>{
    const payload = req.body
    const event = new eventSchema(payload)
    await event.save()
    res.json({Message: "Success"})
})
//Update event in mongoDB
router.put('/updateEvent/:id', async(req, res) =>{
    const payload = req.body
    const { id } = req.params
    const event = await eventSchema.findByIdAndUpdate(id, {$set: payload})
    res.json(event)

})
//Delete event in mongoDB
router.delete('/delEvent/:id', async(req, res) => {
    const { id } = req.params
    await eventSchema.findByIdAndDelete(id)

    res.status(200).end()
})
module.exports = router