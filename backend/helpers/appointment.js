const STATUS = [
    'pending',
    'ongoing',
    'abandoned',
    'done'
]

const initAppointmentStatus = () => {
    return STATUS[0]
}

module.exports = {
    initAppointmentStatus,
}