const express = require('express')
const mongoose = require('mongoose')
const dayjs = require('dayjs')

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

// Get every events in specific year and month from IT Calendar
router.get('/:year/:month', async (req, res) => {

    const { year, month } = req.params
    const minDate = dayjs(`${year}-${month}-01`)
    const lastDate = minDate.daysInMonth()
    const maxDate = dayjs(`${year}-${month}-${lastDate}`).add(1, 'days')

    try {
        const events = await eventModel.find({})
        const filteredEvents = events.filter(event => {
            if (!event.date) return false
            const date = dayjs(event.date, 'YYYY-MM-DD')
            return date > minDate && date < maxDate
        })
        console.log(filteredEvents)
        res.json({events: filteredEvents})
    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }
})

module.exports = router