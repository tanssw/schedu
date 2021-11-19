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

const filterHour = (start, stop, isShift) => {
    const hour = hourItems.filter((item) => item.label >= start && item.label <= stop)
    if (isShift) hour.shift()
    return hour
}

const filterMinute = (start, stop, isShift) => {
    const minute = minuteItems.filter((item) => item.label >= Math.min(start, stop) && item.label <= Math.max(start, stop))
    if (isShift) minute.shift()
    return minute
}

export { hourItems, minuteItems, filterHour, filterMinute }

// export default timeItems = [
//     { label: '00:00', value: '00:00' },
//     { label: '00:05', value: '00:05' },
//     { label: '00:10', value: '00:10' },
//     { label: '00:15', value: '00:15' },
//     { label: '00:20', value: '00:20' },
//     { label: '00:25', value: '00:25' },
//     { label: '00:30', value: '00:30' },
//     { label: '00:35', value: '00:35' },
//     { label: '00:40', value: '00:40' },
//     { label: '00:45', value: '00:45' },
//     { label: '00:50', value: '00:50' },
//     { label: '00:55', value: '00:55' },

//     { label: '01:00', value: '01:00' },
//     { label: '01:05', value: '01:05' },
//     { label: '01:10', value: '01:10' },
//     { label: '01:15', value: '01:15' },
//     { label: '01:20', value: '01:20' },
//     { label: '01:25', value: '01:25' },
//     { label: '01:30', value: '01:30' },
//     { label: '01:35', value: '01:35' },
//     { label: '01:40', value: '01:40' },
//     { label: '01:45', value: '01:45' },
//     { label: '01:50', value: '01:50' },
//     { label: '01:55', value: '01:55' },

//     { label: '02:00', value: '02:00' },
//     { label: '02:05', value: '02:05' },
//     { label: '02:10', value: '02:10' },
//     { label: '02:15', value: '02:15' },
//     { label: '02:20', value: '02:20' },
//     { label: '02:25', value: '02:25' },
//     { label: '02:30', value: '02:30' },
//     { label: '02:35', value: '02:35' },
//     { label: '02:40', value: '02:40' },
//     { label: '02:45', value: '02:45' },
//     { label: '02:50', value: '02:50' },
//     { label: '02:55', value: '02:55' },

//     { label: '03:00', value: '03:00' },
//     { label: '03:05', value: '03:05' },
//     { label: '03:10', value: '03:10' },
//     { label: '03:15', value: '03:15' },
//     { label: '03:20', value: '03:20' },
//     { label: '03:25', value: '03:25' },
//     { label: '03:30', value: '03:30' },
//     { label: '03:35', value: '03:35' },
//     { label: '03:40', value: '03:40' },
//     { label: '03:45', value: '03:45' },
//     { label: '03:50', value: '03:50' },
//     { label: '03:55', value: '03:55' },

//     { label: '04:00', value: '04:00' },
//     { label: '04:05', value: '04:05' },
//     { label: '04:10', value: '04:10' },
//     { label: '04:15', value: '04:15' },
//     { label: '04:20', value: '04:20' },
//     { label: '04:25', value: '04:25' },
//     { label: '04:30', value: '04:30' },
//     { label: '04:35', value: '04:35' },
//     { label: '04:40', value: '04:40' },
//     { label: '04:45', value: '04:45' },
//     { label: '04:50', value: '04:50' },
//     { label: '04:55', value: '04:55' },

//     { label: '05:00', value: '05:00' },
//     { label: '05:05', value: '05:05' },
//     { label: '05:10', value: '05:10' },
//     { label: '05:15', value: '05:15' },
//     { label: '05:20', value: '05:20' },
//     { label: '05:25', value: '05:25' },
//     { label: '05:30', value: '05:30' },
//     { label: '05:35', value: '05:35' },
//     { label: '05:40', value: '05:40' },
//     { label: '05:45', value: '05:45' },
//     { label: '05:50', value: '05:50' },
//     { label: '05:55', value: '05:55' },

//     { label: '06:00', value: '06:00' },
//     { label: '06:05', value: '06:05' },
//     { label: '06:10', value: '06:10' },
//     { label: '06:15', value: '06:15' },
//     { label: '06:20', value: '06:20' },
//     { label: '06:25', value: '06:25' },
//     { label: '06:30', value: '06:30' },
//     { label: '06:35', value: '06:35' },
//     { label: '06:40', value: '06:40' },
//     { label: '06:45', value: '06:45' },
//     { label: '06:50', value: '06:50' },
//     { label: '06:55', value: '06:55' },

//     { label: '07:00', value: '07:00' },
//     { label: '07:05', value: '07:05' },
//     { label: '07:10', value: '07:10' },
//     { label: '07:15', value: '07:15' },
//     { label: '07:20', value: '07:20' },
//     { label: '07:25', value: '07:25' },
//     { label: '07:30', value: '07:30' },
//     { label: '07:35', value: '07:35' },
//     { label: '07:40', value: '07:40' },
//     { label: '07:45', value: '07:45' },
//     { label: '07:50', value: '07:50' },
//     { label: '07:55', value: '07:55' },

//     { label: '08:00', value: '08:00' },
//     { label: '08:05', value: '08:05' },
//     { label: '08:10', value: '08:10' },
//     { label: '08:15', value: '08:15' },
//     { label: '08:20', value: '09:20' },
//     { label: '08:25', value: '08:25' },
//     { label: '08:30', value: '08:30' },
//     { label: '08:35', value: '08:35' },
//     { label: '08:40', value: '08:40' },
//     { label: '08:45', value: '08:45' },
//     { label: '08:50', value: '08:50' },
//     { label: '08:55', value: '08:55' },

//     { label: '09:00', value: '09:00' },
//     { label: '09:05', value: '09:05' },
//     { label: '09:10', value: '09:10' },
//     { label: '09:15', value: '09:15' },
//     { label: '09:20', value: '09:20' },
//     { label: '09:25', value: '09:25' },
//     { label: '09:30', value: '09:30' },
//     { label: '09:35', value: '09:35' },
//     { label: '09:40', value: '09:40' },
//     { label: '09:45', value: '09:45' },
//     { label: '09:50', value: '09:50' },
//     { label: '09:55', value: '09:55' },

//     { label: '10:00', value: '10:00' },
//     { label: '10:05', value: '10:05' },
//     { label: '10:10', value: '10:10' },
//     { label: '10:15', value: '10:15' },
//     { label: '10:20', value: '10:20' },
//     { label: '10:25', value: '10:25' },
//     { label: '10:30', value: '10:30' },
//     { label: '10:35', value: '10:35' },
//     { label: '10:40', value: '10:40' },
//     { label: '10:45', value: '10:45' },
//     { label: '10:50', value: '10:50' },
//     { label: '10:55', value: '10:55' },

//     { label: '11:00', value: '11:00' },
//     { label: '11:05', value: '11:05' },
//     { label: '11:10', value: '11:10' },
//     { label: '11:15', value: '11:15' },
//     { label: '11:20', value: '11:20' },
//     { label: '11:25', value: '11:25' },
//     { label: '11:30', value: '11:30' },
//     { label: '11:35', value: '11:35' },
//     { label: '11:40', value: '11:40' },
//     { label: '11:45', value: '11:45' },
//     { label: '11:50', value: '11:50' },
//     { label: '11:55', value: '11:55' },

//     { label: '12:00', value: '12:00' },
//     { label: '12:05', value: '12:05' },
//     { label: '12:10', value: '12:10' },
//     { label: '12:15', value: '12:15' },
//     { label: '12:20', value: '12:20' },
//     { label: '12:25', value: '12:25' },
//     { label: '12:30', value: '12:30' },
//     { label: '12:35', value: '12:35' },
//     { label: '12:40', value: '12:40' },
//     { label: '12:45', value: '12:45' },
//     { label: '12:50', value: '12:50' },
//     { label: '12:55', value: '12:55' },

//     { label: '13:00', value: '13:00' },
//     { label: '13:05', value: '13:05' },
//     { label: '13:10', value: '13:10' },
//     { label: '13:15', value: '13:15' },
//     { label: '13:20', value: '13:20' },
//     { label: '13:25', value: '13:25' },
//     { label: '13:30', value: '13:30' },
//     { label: '13:35', value: '13:35' },
//     { label: '13:40', value: '13:40' },
//     { label: '13:45', value: '13:45' },
//     { label: '13:50', value: '13:50' },
//     { label: '13:55', value: '13:55' },

//     { label: '14:00', value: '14:00' },
//     { label: '14:05', value: '14:05' },
//     { label: '14:10', value: '14:10' },
//     { label: '14:15', value: '14:15' },
//     { label: '14:20', value: '14:20' },
//     { label: '14:25', value: '14:25' },
//     { label: '14:30', value: '14:30' },
//     { label: '14:35', value: '14:35' },
//     { label: '14:40', value: '14:40' },
//     { label: '14:45', value: '14:45' },
//     { label: '14:50', value: '14:50' },
//     { label: '14:55', value: '14:55' },

//     { label: '15:00', value: '15:00' },
//     { label: '15:05', value: '15:05' },
//     { label: '15:10', value: '15:10' },
//     { label: '15:15', value: '15:15' },
//     { label: '15:20', value: '15:20' },
//     { label: '15:25', value: '15:25' },
//     { label: '15:30', value: '15:30' },
//     { label: '15:35', value: '15:35' },
//     { label: '15:40', value: '15:40' },
//     { label: '15:45', value: '15:45' },
//     { label: '15:50', value: '15:50' },
//     { label: '15:55', value: '15:55' },

//     { label: '16:00', value: '16:00' },
//     { label: '16:05', value: '16:05' },
//     { label: '16:10', value: '16:10' },
//     { label: '16:15', value: '16:15' },
//     { label: '16:20', value: '16:20' },
//     { label: '16:25', value: '16:25' },
//     { label: '16:30', value: '16:30' },
//     { label: '16:35', value: '16:35' },
//     { label: '16:40', value: '16:40' },
//     { label: '16:45', value: '16:45' },
//     { label: '16:50', value: '16:50' },
//     { label: '16:55', value: '16:55' },

//     { label: '17:00', value: '17:00' },
//     { label: '17:05', value: '17:05' },
//     { label: '17:10', value: '17:10' },
//     { label: '17:15', value: '17:15' },
//     { label: '17:20', value: '17:20' },
//     { label: '17:25', value: '17:25' },
//     { label: '17:30', value: '17:30' },
//     { label: '17:35', value: '17:35' },
//     { label: '17:40', value: '17:40' },
//     { label: '17:45', value: '17:45' },
//     { label: '17:50', value: '17:50' },
//     { label: '17:55', value: '17:55' },

//     { label: '18:00', value: '18:00' },
//     { label: '18:05', value: '18:05' },
//     { label: '18:10', value: '18:10' },
//     { label: '18:15', value: '18:15' },
//     { label: '18:20', value: '18:20' },
//     { label: '18:25', value: '18:25' },
//     { label: '18:30', value: '18:30' },
//     { label: '18:35', value: '18:35' },
//     { label: '18:40', value: '18:40' },
//     { label: '18:45', value: '18:45' },
//     { label: '18:50', value: '18:50' },
//     { label: '18:55', value: '18:55' },

//     { label: '19:00', value: '19:00' },
//     { label: '19:05', value: '19:05' },
//     { label: '19:10', value: '19:10' },
//     { label: '19:15', value: '19:15' },
//     { label: '19:20', value: '19:20' },
//     { label: '19:25', value: '19:25' },
//     { label: '19:30', value: '19:30' },
//     { label: '19:35', value: '19:35' },
//     { label: '19:40', value: '19:40' },
//     { label: '19:45', value: '19:45' },
//     { label: '19:50', value: '19:50' },
//     { label: '19:55', value: '19:55' },

//     { label: '20:00', value: '20:00' },
//     { label: '20:05', value: '20:05' },
//     { label: '20:10', value: '20:10' },
//     { label: '20:15', value: '20:15' },
//     { label: '20:20', value: '20:20' },
//     { label: '20:25', value: '20:25' },
//     { label: '20:30', value: '20:30' },
//     { label: '20:35', value: '20:35' },
//     { label: '20:40', value: '20:40' },
//     { label: '20:45', value: '20:45' },
//     { label: '20:50', value: '20:50' },
//     { label: '20:55', value: '20:55' },

//     { label: '21:00', value: '21:00' },
//     { label: '21:05', value: '21:05' },
//     { label: '21:10', value: '21:10' },
//     { label: '21:15', value: '21:15' },
//     { label: '21:20', value: '21:20' },
//     { label: '21:25', value: '21:25' },
//     { label: '21:30', value: '21:30' },
//     { label: '21:35', value: '21:35' },
//     { label: '21:40', value: '21:40' },
//     { label: '21:45', value: '21:45' },
//     { label: '21:50', value: '21:50' },
//     { label: '21:55', value: '21:55' },

//     { label: '22:00', value: '22:00' },
//     { label: '22:05', value: '22:05' },
//     { label: '22:10', value: '22:10' },
//     { label: '22:15', value: '22:15' },
//     { label: '22:20', value: '22:20' },
//     { label: '22:25', value: '22:25' },
//     { label: '22:30', value: '22:30' },
//     { label: '22:35', value: '22:35' },
//     { label: '22:40', value: '22:40' },
//     { label: '22:45', value: '22:45' },
//     { label: '22:50', value: '22:50' },
//     { label: '22:55', value: '22:55' },

//     { label: '23:00', value: '23:00' },
//     { label: '23:05', value: '23:05' },
//     { label: '23:10', value: '23:10' },
//     { label: '23:15', value: '23:15' },
//     { label: '23:20', value: '23:20' },
//     { label: '23:25', value: '23:25' },
//     { label: '23:30', value: '23:30' },
//     { label: '23:35', value: '23:35' },
//     { label: '23:40', value: '23:40' },
//     { label: '23:45', value: '23:45' },
//     { label: '23:50', value: '23:50' },
//     { label: '23:55', value: '23:55' },
// ]