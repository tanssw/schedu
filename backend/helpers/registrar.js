const getFullDayOfWeek = (character) => {
    switch (character) {
        case 'M': return 'Monday'
        case 'T': return 'Tueday'
        case 'W': return 'Wednesday'
        case 'R': return 'Thursday'
        case 'F': return 'Friday'
        default: return null
    }
}

module.exports = {
    getFullDayOfWeek
}