const express = require('express')

const pool = require('../config/mysql')
const { getUserByObjectId } = require('../helpers/account')
const { getFullDayOfWeek } = require('../helpers/registrar')

const router = express()

//Get all registrar in mySQL database
router.get('/all', async (req, res) => {
    //create connection to mySQL Database
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    //query registrar transaction from database
    const result = await conn.query('SELECT * FROM registrar')

    //result[0] = data
    res.send(result[0])

    //when fin close connection to database
    conn.release()
})
//Get registrar by student_id
router.get('/courses', async (req, res) => {

    try {
        const userId = req.headers['schedu-uid']
        const { businessId } = await getUserByObjectId(userId)

        // Create connection to mySQL Database
        const conn = await pool.getConnection()
        await conn.beginTransaction()

        const result = await conn.query(`
            SELECT registrar.subject_id, registrar.section_id, study_start,study_end, day, title_en, mid_exam, mid_start, mid_end, final_exam, final_start, final_end
            FROM registrar
            INNER JOIN section ON registrar.subject_id = section.subject_id AND registrar.section_id = section.section_id
            INNER JOIN subject ON registrar.subject_id = subject.subject_id
            WHERE student_id = ?
        `, [businessId])

        conn.release()

        // Formatting timetable
        const timetable = result[0]
        let formattedTimetable = []
        timetable.forEach(subject => {
            let formattedSubject = {
                study: {
                    subjectId: subject.subject_id,
                    sectionId: subject.section_id,
                    title: subject.title_en,
                    day: getFullDayOfWeek(subject.day),
                    startAt: subject.study_start,
                    endAt: subject.study_end,
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

        res.send({timetable: formattedTimetable})

    } catch (error) {
        res.status(500).send({message: 'Something went wrong. Please try again.'})
    }


})

module.exports = router
