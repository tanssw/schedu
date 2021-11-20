const { getUserByObjectId } = require('./account')
const { createNotification } = require('./notification')

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

module.exports = {
    initAppointmentStatus,
    formatAppointmentsBasic
}
