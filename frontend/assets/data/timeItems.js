var hourItems = [
    { label: '00', value: '00' },
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
    { label: '21', value: '21' },
    { label: '22', value: '22' },
    { label: '23', value: '23' }
]

var minuteItems = [
    { label: '00', value: '00' },
    { label: '05', value: '05' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
    { label: '25', value: '25' },
    { label: '30', value: '30' },
    { label: '35', value: '35' },
    { label: '40', value: '40' },
    { label: '45', value: '45' },
    { label: '50', value: '50' },
    { label: '55', value: '55' }
]

const filterHour = (start, stop, isShift, isPop) => {
    const hour = hourItems.filter(item => item.label >= start && item.label <= stop)
    if (isShift) hour.shift()
    if (isPop) hour.pop()
    return hour
}

const filterMinute = (start, stop, isShift, isPop) => {
    const minute = minuteItems.filter(
        item => item.label >= Math.min(start, stop) && item.label <= Math.max(start, stop)
    )
    if (isShift) minute.shift()
    if (isPop) minute.pop()
    return minute
}

export { hourItems, minuteItems, filterHour, filterMinute }
