const express = require('express');
const pool = require('../config/mysql')
const router = express();

//Get all teacher teach in subject in mySQL database
router.get('/all', async(req, res) =>{
    //create connection to mySQL Database
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    //query teacher from database
    const result = await conn.query('SELECT * FROM subject_teacher');

    //result[0] = data
    res.send(result[0])

    //when fin close connection to database
    conn.release();
})
//Get teacher teach in subject by subject_id or teacher_id in Subject mySQL Database
router.get("/:id", async (req, res) => {
    const {id} = req.params
    //create connection to mySQL Database
    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    const result = await conn.query("SELECT * FROM subject_teacher WHERE subject_id = ? OR teacher_id = ?", [id, id]);
  
    //result[0] = data
    res.send(result[0]);
    //when fin close connection to database
    conn.release();
  });

module.exports = router