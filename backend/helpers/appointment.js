const { getUserByObjectId } = require('./account')

const conn = require('../config/connectionMongoDB/ScheduConnect')
const appointmentSchema = require('../schema/appointmentSchema')
const appointmentModel = conn.model('appointments', appointmentSchema, process.env.APPOINTMENTS_COLLECTION)

const STATUS = ['pending', 'ongoing', 'abandoned', 'done']

const initAppointmentStatus = () => {
    return STATUS[0]
}

const formatAppointmentsBasic = async appointments => {
    let formattedAppointments = []
    for (let appointment of appointments) {
        const sender = await getUserByObjectId(appointment.sender)
        let formattedAppointment = Object.assign({}, appointment._doc)
        formattedAppointment.sender = {
            userId: sender._id,
            firstName: sender.firstName,
            lastName: sender.lastName
        }
        let formattedParticipants = []
        for (let participant of formattedAppointment.participants) {
            const participantUser = await getUserByObjectId(participant.userId)
            let formattedParticipant = Object.assign({}, participant._doc)
            formattedParticipant.firstName = participantUser.firstName
            formattedParticipant.lastName = participantUser.lastName
            formattedParticipants.push(formattedParticipant)
        }
        formattedAppointment.participants = formattedParticipants
        formattedAppointments.push(formattedAppointment)
    }
    return formattedAppointments
}

const getAppointmentFromId = async (appointmentId) => {
    const appointment = await appointmentModel.findOne({_id: appointmentId})
    return appointment
}

const isParticipate = async (appointmentId, userId) => {
    const appointment = await appointmentModel.findOne({
        _id: appointmentId,
        $or: [
            { sender: userId },
            {
                particiapants: {
                    $elemMatch: {userId: userId}
                }
            }
        ]
    })
    return !!appointment
}

module.exports = {
    initAppointmentStatus,
    formatAppointmentsBasic,
    getAppointmentFromId,
    isParticipate
}
