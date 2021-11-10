const express = require('express')
const mongoose = require('mongoose')

const conn = require('../config/connectionMongoDB/ScheduConnect')
const { getUserByObjectId } = require('../helpers/account')
const appointmentSchema = require('../schema/appointmentSchema')
const appointmentModel = conn.model('appointments', appointmentSchema, process.env.APPOINTMENTS_COLLECTION)

const router = express()

// Get all appointments associate with userId
router.get('/:userId', async (req, res) => {

    const userId = req.params.userId

    // Find all appointments that user associated to.
    let appointments = await appointmentModel.find({
        $or: [
            {
                sender: userId
            },
            {
                participants: {
                    $elemMatch: {userId: userId}
                }
            }
        ]
    })

    // Get name of each user associate with an appointment
    let formattedAppointments = []
    for (let appointment of appointments) {
        const sender = await getUserByObjectId(appointment.sender)
        let formattedAppointment = Object.assign({}, appointment._doc)
        formattedAppointment.sender = {
            userId: sender._id,
            firstName: sender.firstName,
            lastName: sender.lastName
        }
        let formattedParticipants = []
        for (let participant of formattedAppointment.participants) {
            const participantUser = await getUserByObjectId(participant.userId)
            let formattedParticipant = Object.assign({}, participant._doc)
            formattedParticipant.firstName = participantUser.firstName
            formattedParticipant.lastName = participantUser.lastName
            formattedParticipants.push(formattedParticipant)
        }
        formattedAppointment.participants = formattedParticipants
        formattedAppointments.push(formattedAppointment)
    }

    res.json({appointments: formattedAppointments})
})

// Create new Appointment
router.post('/', async(req, res) => {
    const payload = req.body

    // Mapping business_id of participants to an Object with some logic keys
    let participants = payload.participants.map(participant => {
        return {userId: participant, main: false, confirmed: false}
    })

    // Structuring payload data before saving into the database
    const data = {
        subject: payload.subject,
        sender: payload.sender,
        participants: [
            {userId: payload.receiver, main: true, confirmed: false},
            ...participants
        ],
        startAt: payload.startAt,
        endAt: payload.endAt,
        commMethod: payload.commMethod,
        commUrl: payload.commUrl,
        note: payload.note
    }

    console.log(data)

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

/* ------------------------ NOT IN USE ------------------------ */

// Get appointment by appointment object id
router.get('/:id', async(req, res) =>{
    const { id } = req.params
    const appointment = await appointmentModel.findById(id)
    res.json(appointment)
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
