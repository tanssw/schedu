const express = require('express')
const mongoose = require('mongoose')

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.apply(utc)

const conn = require('../config/connectionMongoDB/ScheduConnect')
const appointmentSchema = require('../schema/appointmentSchema')
const appointmentModel = conn.model('appointments', appointmentSchema, process.env.APPOINTMENTS_COLLECTION)

const { getUserByObjectId } = require('../helpers/account')
const { initAppointmentStatus, formatAppointmentsBasic } = require('../helpers/appointment')
const { getUserIdFromToken } = require('../helpers/auth')
const { authMiddleware } = require('../middlewares/auth')

const router = express()

// Get all appointments associate with userId
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Get User ID from Auth Token
        const userId = req.headers['schedu-uid']

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
        const formattedAppointments = await formatAppointmentsBasic(appointments)
        res.json({appointments: formattedAppointments})

    } catch (error) {
        res.send(500).send({message: 'Something went wrong. Please try again later.'})
    }

})

// Gett appointments by month and year
router.get('/:year/:month', authMiddleware, async(req, res) => {
    try {
        // Get User ID from Auth Token
        const userId = req.headers['schedu-uid']

        const year = req.params.year
        const month = req.params.month
        const minDate = dayjs(`${year}-${month}-01`)
        const lastDate = minDate.daysInMonth()
        const maxDate = dayjs(`${year}-${month}-${lastDate}`).add(1, 'days')

        // Find all appointments that user associated to.
        let appointments = await appointmentModel.find({
            $and: [
                {
                    startAt: {'$gte': minDate, '$lt': maxDate}
                },
                {
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
                }
            ]
        })

        // Get name of each user associate with an appointment
        const formattedAppointment = await formatAppointmentsBasic(appointments)
        res.json({appointments: appointments})

    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'error'})
    }
})

// Create new Appointment
// TODO: Add auth middleware
router.post('/', async(req, res) => {
    const payload = req.body

    // Mapping business_id of participants to an Object with some logic keys
    let participants = payload.participants.map(participant => {
        return {userId: participant, main: false, confirmed: false}
    })

    // Structuring payload data before saving into the database
    const data = {
        subject: payload.subject,
        status: initAppointmentStatus(),
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

module.exports = router
