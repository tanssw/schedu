const express = require('express')
const mongoose = require('mongoose')

const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.apply(utc)

const conn = require('../config/connectionMongoDB/ScheduConnect')
const appointmentSchema = require('../schema/appointmentSchema')
const appointmentModel = conn.model('appointments', appointmentSchema, process.env.APPOINTMENTS_COLLECTION)

const { getUserByObjectId } = require('../helpers/account')
const { initAppointmentStatus, formatAppointmentsBasic, getAppointmentFromId, isParticipate, updateAppointmentStatus } = require('../helpers/appointment')
const { authMiddleware } = require('../middlewares/auth')
const { getDateRange } = require('../helpers/date')
const { createRequestNotification, acknowledgeRequestNotification, createAbandonedNotification } = require('../helpers/notification')

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

        // Filter appointment that already declined
        let declinedAppointments = appointments.filter(appointment => {
            let meDeclined = appointment.participants.filter(participant => participant.userId === userId && !participant.join && participant.confirmed)
            return !!meDeclined.length
        })

        let overallCount = appointments.length
        let requestCount = requestAppointments.length
        let endedCount = endedAppointments.length
        let declinedCount = declinedAppointments.length
        let ongoingCount = appointments.length - requestCount - declinedCount
        let activeCount = ongoingCount - endedCount

        res.json({
            overall: overallCount,
            request: requestCount,
            declined: declinedCount,
            ongoing: ongoingCount,
            end: endedCount,
            active: activeCount
        })

    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }
})

// Get users that client recently contacted with
router.get('/recently', authMiddleware, async (req, res) => {
    try {
        const userId = req.headers['schedu-uid']
        const appointments = await appointmentModel.find({sender: userId})

        // Get array of contacted receivers
        let receivers = appointments.map(appointment => {
            const receiver = appointment.participants.find(participant => participant.main)
            return {
                userId: receiver.userId,
                time: appointment.createdAt
            }
        })

        // Sorting by time from newest to oldest
        receivers.sort((a, b) => {
            let atime = dayjs(a.time)
            let btime = dayjs(b.time)
            if (atime > btime) return -1
            if (atime < btime) return 1
            return 0
        })

        let recentlyContacts = []
        for (let receiver of receivers) {
            // Check if receiver not already assigned in recently contact
            let alreadyAssigned = recentlyContacts.map(contact => contact.userId)
            if (!alreadyAssigned.includes(receiver.userId)) {
                // Get user data and push it in the array
                let userData = await getUserByObjectId(receiver.userId)
                receiver.firstName = userData.firstName
                receiver.lastName = userData.lastName
                receiver.image = userData.image
                recentlyContacts.push(receiver)
            }
        }

        res.json({result: recentlyContacts})

    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }
})

// Get appointment detail by it's ID
router.get('/:appointmentId', authMiddleware, async (req, res) => {
    try {
        const { appointmentId } = req.params
        const userId = req.headers['schedu-uid']
        if (!isParticipate(appointmentId, userId)) return res.status(400).send({message: 'You are not partipating in this appointment.'})
        const appointment = await getAppointmentFromId(appointmentId)
        res.json({result: appointment})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }
})

// Get confirmed appointments by month and year
router.get('/:year/:month', authMiddleware, async(req, res) => {
    try {
        // Get User ID from Auth Token
        const userId = req.headers['schedu-uid']

        const { year, month } = req.params
        const { minDate, maxDate } = getDateRange(year, month)

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
                                $elemMatch: {userId: userId, confirmed: true, join: true}
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
        res.status(500).send({message: 'Something went wrong. Please try aagain later.'})
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

        // Create notification to all participants
        let participantToNotify = appointmentRequest.participants
        participantToNotify.push(appointmentRequest.receiver)
        await createRequestNotification(participantToNotify, result._id, appointmentRequest.startAt)

        res.json({message: `Successfully create new appointment (ID: ${result._id})`})
    } catch (error) {
        res.status(400).send({message: "Cannot create new appointment. Something went wrong."})
    }
})

// Update Accept/Decline Appointment Approval
router.put('/', authMiddleware, async (req,res) => {

    try {

        const { join, userId, appointmentId, appointmentData } = req.body

        // Mapping business_id of participants to an Object with some logic keys
        let participants = appointmentData.participants.map(participant => {
            if (userId === participant.userId){
               return {userId: userId, main: participant.main, confirmed: true, join: join}
            } else {
               return participant
            }
        })

        // Structuring payload data and update the database
        const data = {
            subject: appointmentData.subject,
            status: appointmentData.status,
            sender: appointmentData.sender.userId,
            participants: participants,
            startAt: appointmentData.startAt,
            endAt: appointmentData.endAt,
            commMethod: appointmentData.commMethod,
            commUrl: appointmentData.commUrl,
            note: appointmentData.note
        }
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(appointmentId, {$set: data}, {new: true})

        // Acknowledge the request notification
        await acknowledgeRequestNotification(userId, appointmentId)

        // Update appointment's status
        const newStatus = await updateAppointmentStatus(updatedAppointment)

        // Create notification that appointment has been abandoned
        if (newStatus === 'abandoned') {
            // Mapping targets to [id1, id2, id3, ...] from [Object, Object, Object, ...] and remove current user from notify target
            let targets = appointmentData.participants.map(participant => participant.userId)
            targets.push(appointmentData.sender.userId)
            targets.splice(targets.indexOf(userId), 1)
            createAbandonedNotification(targets, appointmentId)
        }

        res.json({message: `Successfully updated appointment with id: ${updatedAppointment._id}`})

    } catch(error){
        console.log(error)
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }

})

module.exports = router
