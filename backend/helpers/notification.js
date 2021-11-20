const notificationSchema = require('../schema/notificationSchema')
let conn = require('../config/connectionMongoDB/ScheduConnect')
const { getAppointmentFromId } = require('./appointment')
const notificationModel = conn.model('notifications', notificationSchema, process.env.NOTIFICATIONS_COLLECTION)

// Create appointment request notification
const createRequestNotification = async (targets, appointmentId, appointmentDatetime) => {
    targets = targets.map(target => ({userId: target, response: false}))
    const data = {
        type: 'request',
        targets: targets,
        appointmentId: appointmentId,
        expireAt: appointmentDatetime
    }
    const notification = new notificationModel(data)
    const result = await notification.save()
}

// Format notification depend on its type
const formatNotification = async (notification) => {
    switch (notification.type) {
        case 'request': return await formatRequestNotification(notification)
    }
}

const formatRequestNotification = async (notification) => {
    const appointment = await getAppointmentFromId(notification.appointmentId)
    return {
        ...notification._doc,
        detail: {
            sender: appointment.sender,
            startAt: appointment.startAt,
            endAt: appointment.endAt
        }
    }
}

module.exports = {
    createRequestNotification,
    formatNotification
}