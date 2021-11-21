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

const updateAppointmentStatus = async (appointment) => {

    const appointmentId = appointment._id

    let newStatus
    switch (appointment.status) {
        // For 'pending' status, will change to 'ongoing' if all participant is confirmed
        case STATUS[0]:
            const receiver = appointment.participants.find(participant => participant.main && participant.confirmed)
            // If receiver not confirmed yet. Do nothing
            if (!receiver) return
            // Else, check if receiver is joined or not [join -> ongoing, decline -> abandoned]
            newStatus = receiver.join ? STATUS[1] : STATUS[2]
            const result = await appointmentModel.updateOne({_id: appointment._id}, {status: newStatus})
            return newStatus
    }

}

module.exports = {
    initAppointmentStatus,
    formatAppointmentsBasic,
    getAppointmentFromId,
    isParticipate,
    updateAppointmentStatus
}
