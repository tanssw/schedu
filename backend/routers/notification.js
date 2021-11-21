const notificationSchema = require('../schema/notificationSchema')
var conn = require('../config/connectionMongoDB/ScheduConnect')
const notificationModel = conn.model('notifications', notificationSchema, process.env.NOTIFICATIONS_COLLECTION)

const express = require('express')

const router = express()

const { authMiddleware } = require('../middlewares/auth')
const { getAppointmentFromId } = require('../helpers/appointment')
const { formatNotification } = require('../helpers/notification')


// Get all notification of request client
router.get('/all', authMiddleware, async (req, res) => {
    try {
        const userId = req.headers['schedu-uid']
        const notifications = await notificationModel.find({
            targets: {
                $elemMatch: {userId: userId}
            }
        }).sort([['createdAt', -1]])

        let formattedNotifications = []
        for (let notification of notifications) {
            const formattedNotification = await formatNotification(notification)
            formattedNotifications.push(formattedNotification)
        }

        res.json({notifications: formattedNotifications})
    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }
})

// Get active notification of request client
router.get('/active', authMiddleware, async (req, res) => {
    try {
        const userId = req.headers['schedu-uid']
        // Get notification which not expire and sorting them from newest one
        const notifications = await notificationModel.find({
            targets: {
                $elemMatch: {userId: userId, response: false}
            },
            expireAt: {$gte: new Date()}
        }).sort([['createdAt', -1]])

        let formattedNotifications = []
        for (let notification of notifications) {
            const formattedNotification = await formatNotification(notification)
            formattedNotifications.push(formattedNotification)
        }

        res.json({notifications: formattedNotifications})
    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }
})

// Get newest notification
router.get('/newest', authMiddleware, async (req, res) => {
    try {
        const userId = req.headers['schedu-uid']
        const notifications = await notificationModel.find({
            targets: {
                $elemMatch: {userId: userId, response: false}
            },
            expireAt: {$gte: new Date()}
        }).sort([['createdAt', -1]])

        const formattedNotification = await formatNotification(notifications[0])
        res.json({notification: formattedNotification})
    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again later.'})
    }
})

module.exports = router