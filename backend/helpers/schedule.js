const dayjs = require('dayjs')
const schedule = require('node-schedule')

const { forceUpdateAppointmentStatus, getAppointmentFromId } = require('../helpers/appointment')

// Schedule the status update for an appointment
const scheduleAppointmentUpdate = (appointment) => {

    const startAt = dayjs(appointment.startAt).format()
    const endAt = dayjs(appointment.endAt).format()

    // If the appointment has no reaction before start time then change status to 'abandoned'
    const checkAbandonJob = schedule.scheduleJob(startAt, async () => {
        try {
            const currentData = await getAppointmentFromId(appointment._id)
            if (currentData.status === 'pending') await forceUpdateAppointmentStatus(appointment._id, 'abandoned')
        } catch (error) {

        }
    })

    // If the appointment is end then change status to 'done'
    const checkDoneJob = schedule.scheduleJob(endAt, async () => {
        try {
            const currentData = await getAppointmentFromId(appointment._id)
            if (currentData.status === 'ongoing') await forceUpdateAppointmentStatus(appointment._id, 'done')
        } catch (error) {

        }
    })
}

module.exports = {
    scheduleAppointmentUpdate
}