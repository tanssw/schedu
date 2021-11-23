const dayjs = require('dayjs')
const schedule = require('node-schedule')

const { forceUpdateAppointmentStatus, getAppointmentFromId } = require('../helpers/appointment')
const { acknowledgeRequestNotification, createAbandonedNotification } = require('./notification')

// Schedule the status update for an appointment
const scheduleAppointmentUpdate = appointment => {
    const startAt = dayjs(appointment.startAt).format()
    const endAt = dayjs(appointment.endAt).format()

    // If the appointment has no reaction before start time then change status to 'abandoned'
    const checkAbandonJob = schedule.scheduleJob(startAt, async () => {
        try {
            const currentData = await getAppointmentFromId(appointment._id)
            if (currentData.status === 'pending') {
                // Set appointment status to 'abandoned'
                await forceUpdateAppointmentStatus(appointment._id, 'abandoned')
                // Set all participants' request acknowledge to true and notify abandoned to all participant and sender
                let targets = currentData.participants.map(participant => participant.userId)
                for (let target of targets) {
                    await acknowledgeRequestNotification(target, appointment._id)
                }
                targets.push(currentData.sender)
                await createAbandonedNotification(targets, appointment._id)
            }
        } catch (error) {}
    })

    // If the appointment is end then change status to 'done'
    const checkDoneJob = schedule.scheduleJob(endAt, async () => {
        try {
            const currentData = await getAppointmentFromId(appointment._id)
            if (currentData.status === 'ongoing') {
                // Set appointment status to 'done'
                await forceUpdateAppointmentStatus(appointment._id, 'done')
                // Set all participants' request acknowledge to true
                let targets = currentData.participants.map(participant => participant.userId)
                for (let target of targets) {
                    await acknowledgeRequestNotification(target, appointment._id)
                }
            }
        } catch (error) {}
    })
}

module.exports = {
    scheduleAppointmentUpdate
}
