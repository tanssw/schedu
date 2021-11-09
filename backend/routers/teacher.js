const express = require('express');
const pool = require('../config/mysql')
const router = express();

//Get all teacher in mySQL database
router.get('/all', async(req, res) =>{
    //create connection to mySQL Database
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    //query teacher from database
    const result = await conn.query('SELECT * FROM teacher');

    //result[0] = data
    res.send(result[0])

    //when fin close connection to database
    conn.release();
})
//Get Teacher by id in Teacher mySQL Database
router.get("/:id", async (req, res) => {
    const {id} = req.params
    //create connection to mySQL Database
    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    const result = await conn.query("SELECT * FROM teacher WHERE teacher_id = ?", [id]);
  
    //result[0] = data
    res.send(result[0]);
    //when fin close connection to database
    conn.release();
  });
  

module.exports = router