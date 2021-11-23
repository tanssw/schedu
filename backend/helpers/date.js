const dayjs = require('dayjs')

const getDateRange = (year, month) => {
    const minDate = dayjs(`${year}-${month}-01`)
    const lastDate = minDate.daysInMonth()
    const maxDate = dayjs(`${year}-${month}-${lastDate}`).add(1, 'days')
    return { minDate, maxDate }
}

module.exports = {
    getDateRange
}
