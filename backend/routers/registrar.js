const express = require('express')

const pool = require('../config/mysql')
const { getUserByObjectId } = require('../helpers/account')
const { formatDefaultTimetable, formatMonthTimetable } = require('../helpers/registrar')
const { authMiddleware } = require('../middlewares/auth')
const { getDateRange } = require('../helpers/date')

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

// Get Timetable from User ID
router.get('/courses', authMiddleware, async (req, res) => {
    try {
        const userId = req.headers['schedu-uid']
        const { businessId } = await getUserByObjectId(userId)

        // Get study timetable
        const conn = await pool.getConnection()
        await conn.beginTransaction()

        const result = await conn.query(
            `
            SELECT registrar.subject_id, registrar.section_id, study_start,study_end, day, title_en, mid_exam, mid_start, mid_end, final_exam, final_start, final_end
            FROM registrar
            INNER JOIN section ON registrar.subject_id = section.subject_id AND registrar.section_id = section.section_id
            INNER JOIN subject ON registrar.subject_id = subject.subject_id
            WHERE student_id = ?
        `,
            [businessId]
        )

        conn.release()

        // Format study timetable
        const timetable = result[0]
        const formattedTimetable = formatDefaultTimetable(timetable)
        res.json({ timetable: formattedTimetable })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong. Please try again.' })
    }
})

// Get Timetable by year and month from User ID
router.get('/courses/:year/:month', authMiddleware, async (req, res) => {
    const { year, month } = req.params

    try {
        let { minDate, maxDate } = getDateRange(year, month)
        minDate = minDate.format('YYYY-MM-DD')
        maxDate = maxDate.format('YYYY-MM-DD')

        const userId = req.headers['schedu-uid']
        const { businessId } = await getUserByObjectId(userId)

        // Get study timetable by month
        const conn = await pool.getConnection()
        await conn.beginTransaction()

        const result = await conn.query(
            `
            SELECT registrar.subject_id, registrar.section_id, study_start,study_end, day, title_en, mid_exam, mid_start, mid_end, final_exam, final_start, final_end
            FROM registrar
            INNER JOIN section ON registrar.subject_id = section.subject_id AND registrar.section_id = section.section_id
            INNER JOIN subject ON registrar.subject_id = subject.subject_id
            WHERE student_id = ?
            AND (
                mid_exam BETWEEN ? AND ? OR final_exam BETWEEN ? AND ?
            )

        `,
            [businessId, minDate, maxDate, minDate, maxDate]
        )

        conn.release()

        // Format study timetable
        const timetable = result[0]
        const formattedTimetable = formatMonthTimetable(timetable, year, month)
        res.send({ timetable: formattedTimetable })
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong. Please try again.' })
    }
})

module.exports = router
