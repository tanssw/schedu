const dayjs = require('dayjs')
const pool = require('../config/mysql')

const getFullDayOfWeek = character => {
    switch (character) {
        case 'M':
            return 'Monday'
        case 'T':
            return 'Tueday'
        case 'W':
            return 'Wednesday'
        case 'R':
            return 'Thursday'
        case 'F':
            return 'Friday'
        default:
            return null
    }
}

const formatDefaultTimetable = timetable => {
    let formattedTimetable = []
    timetable.forEach(subject => {
        let formattedSubject = {
            study: {
                subjectId: subject.subject_id,
                sectionId: subject.section_id,
                title: subject.title_en,
                day: getFullDayOfWeek(subject.day),
                startAt: subject.study_start,
                endAt: subject.study_end
            },
            midterm: {
                date: subject.mid_exam,
                startAt: subject.mid_start,
                endAt: subject.mid_end
            },
            final: {
                date: subject.final_exam,
                startAt: subject.final_start,
                endAt: subject.final_end
            }
        }
        formattedTimetable.push(formattedSubject)
    })
    return formattedTimetable
}

const formatMonthTimetable = (timetable, year, month) => {
    let formattedTimetable = []
    timetable.forEach(subject => {
        let formattedSubject = {
            subjectId: subject.subject_id,
            sectionId: subject.section_id,
            title: subject.title_en,
            day: getFullDayOfWeek(subject.day),
            startAt: subject.study_start,
            endAt: subject.study_end
        }

        month = month.length === 1 ? `0${month}` : month
        let isMidterm = dayjs(subject.mid_exam).format('YYYY-MM') === `${year}-${month}`
        let isFinal = dayjs(subject.final_exam).format('YYYY-MM') === `${year}-${month}`

        if (isMidterm) {
            formattedSubject.exam = {
                type: 'midterm',
                date: subject.mid_exam,
                startAt: subject.mid_start,
                endAt: subject.mid_end
            }
        } else if (isFinal) {
            formattedSubject.exam = {
                type: 'final',
                date: subject.final_exam,
                startAt: subject.final_start,
                endAt: subject.final_end
            }
        }
        formattedTimetable.push(formattedSubject)
    })
    return formattedTimetable
}

module.exports = {
    getFullDayOfWeek,
    formatDefaultTimetable,
    formatMonthTimetable
}
