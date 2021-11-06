const express = require('express')
const mongoose = require('mongoose')

const appointmentSchema = require('../Schema/appointmentSchema')
var conn = require('../config/connectionMongoDB/ScheduConnect')

const router = express()

const appointmentModel = conn.model('appointments', appointmentSchema, process.env.APPOINTMENTS_COLLECTION)

// Get all appointments
// TODO: Get all that associate with request's user only
router.get('/all', async(req, res) =>{
    const appointment = await appointmentModel.find({})
    res.json(appointment)
})

// Get appointment by appointment object id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    const appointment = await appointmentModel.findById(id)
    res.json(appointment)
})

// Create new Appointment
router.post('/', async(req, res) => {
    const payload = req.body

    // Mapping business_id of participants to an Object with some logic keys
    let participants = payload.participants.map(participant => {
        return {business_id: participant, main: false, confirmed: false}
    })

    // Structuring payload data before saving into the database
    const data = {
        subject: payload.subject,
        sender: payload.sender,
        participants: [
            {business_id: payload.receiver, main: true, confirmed: false},
            ...participants
        ],
        comm_method: payload.comm_method,
        comm_url: payload.comm_url,
        note: payload.note
    }

    // TODO: Do the validation before saving into the database

    // Save into the database
    const appointment = new appointmentModel(data)
    try {
        const result = await appointment.save()
        res.json({message: `Successfully create new appointment (ID: ${result._id})`})
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Cannot create new appointment. Something went wrong."})
    }

})

// Update appointment in mongoDB
router.put('/updateAppointment/:id', async(req, res) =>{
    const payload = req.body
    const { id } = req.params
    const appointment = await appointmentModel.findByIdAndUpdate(id, {$set: payload})
    res.json(appointment)

})

// Delete appointment in mongoDB
router.delete('/delAppointment/:id', async(req, res) => {
    const { id } = req.params
    await appointmentModel.findByIdAndDelete(id)
    res.json({message: "Delete appointment"})

    res.status(200).end()
})

module.exports = router
