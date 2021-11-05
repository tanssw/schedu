const express = require('express');
const mongoose = require('mongoose')
const appointmentSchema = require('../Schema/appointmentSchema')
var conn = require('../config/connectionMongoDB/ScheduConnect')
const router = express();

const appointmentModel = conn.model('appointment' , appointmentSchema, 'appointment')

//Get all appointment in mongoDB
router.get('/all', async(req, res) =>{
    const appointment = await appointmentModel.find({})
    res.json(appointment)
})
//Get appointment by appointment object id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    const appointment = await appointmentModel.findById(id)
    res.json(appointment)
})
//Add New appointment in mongoDB
router.post('/addAppointment', async(req, res) =>{
    const payload = req.body
    const appointment = new appointmentModel(payload)
    await appointment.save()
    res.json({Message: "Success"})
})
//Update appointment in mongoDB
router.put('/updateAppointment/:id', async(req, res) =>{
    const payload = req.body
    const { id } = req.params
    const appointment = await appointmentModel.findByIdAndUpdate(id, {$set: payload})
    res.json(appointment)

})
//Delete appointment in mongoDB
router.delete('/delAppointment/:id', async(req, res) => {
    const { id } = req.params
    await appointmentModel.findByIdAndDelete(id)
    res.json({message: "Delete appointment"})

    res.status(200).end()
})

module.exports = router
