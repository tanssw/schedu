const dayjs = require('dayjs')
const schedule = require('node-schedule')

const conn = require('../config/connectionMongoDB/ScheduConnect')
const scheduleSchema = require('../schema/scheduleSchema')
const scheduleModel = conn.model('schedule', scheduleSchema, process.env.SCHEDULE_COLLECTION)

const { forceUpdateAppointmentStatus, getAppointmentFromId } = require('../helpers/appointment')
const { acknowledgeRequestNotification, createAbandonedNotification } = require('./notification')

// To re-schedule every time server restart.
const rescheduleOnStart = async () => {
    try {
        const savedSchedules = await scheduleModel.find({})
        for (let schedule of savedSchedules) {
            switch (schedule.type) {
                case 'appointment':
                    await scheduleAppointmentUpdate(schedule.data, schedule._id)
                    break
            }
        }
    } catch (error) {
        console.log('Error occured on re-scheduling')
    }
}

const removeSavedSchedule = async (scheduleId) => {
    try {
        await scheduleModel.findByIdAndDelete(scheduleId)
    } catch (error) {
        console.log('Error occured when removing saved schedule')
    }
}

// Re-calculate datetime if it's less than current time then convert it to T+1
const recalculateTime = (datetime) => {
    if (dayjs(datetime) > dayjs()) return dayjs(datetime).format()
    return dayjs().add(1, 'minute').format()
}

// Schedule the status update for an appointment
const scheduleAppointmentUpdate = async (appointment, savedId=null) => {

    console.log(`[Schedule] ${savedId ? 'Restarting' : 'Register'} a schedule for updating appointment id: ${appointment._id}`)

    // Save to schedule database if the action isn't come from restarting
    if (!savedId) {
        const scheduleToSave = new scheduleModel({type: 'appointment', data: appointment})
        const savedSchedule = await scheduleToSave.save()
        savedId = savedSchedule._id
    }

    const startAt = recalculateTime(appointment.startAt)
    const endAt = recalculateTime(appointment.endAt)

    // If the appointment has no reaction before start time then change status to 'abandoned'
    const checkAbandonJob = schedule.scheduleJob(startAt, async () => {
        console.log(`[Schedule] Do checking an 'abandon' appointment`)
        try {
            const currentData = await getAppointmentFromId(appointment._id)
            if (currentData.status === 'pending') {
                // Remove from the saving list
                await removeSavedSchedule(savedId)
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
        console.log(`[Schedule] Do checking an 'done' appointment`)
        try {
            const currentData = await getAppointmentFromId(appointment._id)
            if (currentData.status === 'ongoing') {
                // Remove from the saving list
                await removeSavedSchedule(savedId)
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
    rescheduleOnStart,
    scheduleAppointmentUpdate
}
