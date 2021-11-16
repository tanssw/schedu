const express = require('express')
const mongoose = require('mongoose')

const eventSchema = require('../schema/eventSchema')
const conn = require('../config/connectionMongoDB/IT_CalendarConnect')
const eventModel = conn.model('events' , eventSchema, process.env.EVENTS_COLLECTION)

const router = express()

// Get every events in IT Calendar
router.get('/', async (req, res) => {
    try {
        const events = await eventModel.find({})
        res.json({events: events})
    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }
})

module.exports = router