const notificationSchema = require('../schema/notificationSchema')
let conn = require('../config/connectionMongoDB/ScheduConnect')
const notificationModel = conn.model('notifications', notificationSchema, process.env.NOTIFICATIONS_COLLECTION)

// Create appointment request notification
const createRequestNotification = async (targets, appointmentId) => {
    const data = {
        type: 'request',
        targets: targets,
        appointmentId: appointmentId
    }
    const notification = new notificationModel(data)
    const result = await notification.save()
}

module.exports = {
    createRequestNotification
}