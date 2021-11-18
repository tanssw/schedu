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
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }

})

// Get confirmed appointments by month and year
router.get('/:year/:month', authMiddleware, async(req, res) => {
    try {
        // Get User ID from Auth Token
        const userId = req.headers['schedu-uid']

        const { year, month } = req.params
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
                                $elemMatch: {userId: userId, confirmed: true}
                            }
                        }
                    ]
                }
            ]
        })

        // Get name of each user associate with an appointment
        const formattedAppointments = await formatAppointmentsBasic(appointments)
        res.json({appointments: formattedAppointments})

    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Something went wrong. Please try aagain later.'})
    }
})

// Get appointment counter
router.get('/count', authMiddleware, async (req, res) => {
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

        // Filter appointment that this account is not a sender and not confirmed
        let requestAppointments = appointments.filter(appointment => {
            if (appointment.sender === userId) return false
            let meConfirmed = appointment.participants.filter(participant => participant.userId == userId && participant.confirmed)
            if (meConfirmed.length) return false
            return true
        })

        // Filter appointment that already end
        let endedAppointments = appointments.filter(appointment => ['abandoned', 'done'].includes(appointment.status))

        let overallCount = appointments.length
        let requestCount = requestAppointments.length
        let endedCount = endedAppointments.length
        let ongoingCount = appointments.length - requestCount
        let activeCount = ongoingCount - endedCount

        res.json({
            overall: overallCount,
            request: requestCount,
            ongoing: ongoingCount,
            end: endedCount,
            active: activeCount
        })

    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }
})

// Create new Appointment
router.post('/', authMiddleware, async (req, res) => {
    try {
        const appointmentRequest = req.body

        // Mapping business_id of participants to an Object with some logic keys
        let participants = appointmentRequest.participants.map(participant => {
            return {userId: participant, main: false, confirmed: false}
        })

        // Structuring appointmentRequest data before saving into the database
        const data = {
            subject: appointmentRequest.subject,
            status: initAppointmentStatus(),
            sender: appointmentRequest.sender,
            participants: [
                {userId: appointmentRequest.receiver, main: true, confirmed: false},
                ...participants
            ],
            startAt: appointmentRequest.startAt,
            endAt: appointmentRequest.endAt,
            commMethod: appointmentRequest.commMethod,
            commUrl: appointmentRequest.commUrl,
            note: appointmentRequest.note
        }

        // TODO: Do the validation before saving into the database

        // Save into the database
        const appointment = new appointmentModel(data)
        const result = await appointment.save()
        res.json({message: `Successfully create new appointment (ID: ${result._id})`})
    } catch (error) {
        console.log(error)
        res.status(400).send({message: "Cannot create new appointment. Something went wrong."})
    }
})
router.put('/update',authMiddleware,async(req,res) =>{
    const payload = req.body

     // Mapping business_id of participants to an Object with some logic keys
     let participants = payload.data.participants.map(participant => {
         if(payload.uid === participant.userId){
            return {userId: participant.userId, main: participant.main, confirmed: participant.confirmed, join: payload.join}
         }
         else{
            return participant
         }
        
    })

    // Structuring payload data before saving into the database
    const data = {
        subject: payload.data.subject,
        status: initAppointmentStatus(),
        sender: payload.data.sender.userId,
        participants: participants,
        startAt: payload.data.startAt,
        endAt: payload.data.endAt,
        commMethod: payload.data.commMethod,
        commUrl: payload.data.commUrl,
        note: payload.note
    }


    try{
        const appointmentUpdate = await appointmentModel.findByIdAndUpdate(payload.appointmentId, {$set : data })
        res.status(200).send()

    }
    catch(error){
        console.error(error)
    }

})
module.exports = router
