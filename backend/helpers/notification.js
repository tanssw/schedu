const notificationSchema = require('../schema/notificationSchema')
let conn = require('../config/connectionMongoDB/ScheduConnect')
const notificationModel = conn.model('notifications', notificationSchema, process.env.NOTIFICATIONS_COLLECTION)

const { getAppointmentFromId } = require('./appointment')
const { getUserByObjectId } = require('./account')

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
const formatNotification = async (notification, userId) => {
    switch (notification.type) {
        case 'request': return await formatRequestNotification(notification, userId)
    }
}

const formatRequestNotification = async (notification, userId) => {
    const appointment = await getAppointmentFromId(notification.appointmentId)
    const sender = await getUserByObjectId(appointment.sender)
    let result = {
        ...notification._doc,
        detail: {
            sender: {
                firstName: sender.firstName,
                lastName: sender.lastName
            },
            startAt: appointment.startAt,
            endAt: appointment.endAt
        }
    }
    result.response = (notification._doc.targets.find(target => target.userId === userId)).response
    delete result.targets
    return result
}

// Update user's notification state
const acknowledgeRequestNotification = async (userId, appointmentId) => {
    const result = await notificationModel.findOneAndUpdate({
        type: 'request',
        appointmentId: appointmentId,
        targets: {
            $elemMatch: {userId: userId}
        }
    }, {'targets.$.response': true})
}

module.exports = {
    createRequestNotification,
    formatNotification,
    acknowledgeRequestNotification
}