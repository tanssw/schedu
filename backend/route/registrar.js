const express = require('express');
const pool = require('../config/mysql')
const router = express();

//Get all registrar in mySQL database
router.get('/all', async(req, res) =>{
    //create connection to mySQL Database
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    
    //query registrar transaction from database
    const result = await conn.query('SELECT * FROM registrar');

    //result[0] = data
    res.send(result[0])

    //when fin close connection to database
    conn.release();
})
//Get registrar by student_id
router.get("/:id", async (req, res) => {
    const {id} = req.params
    //create connection to mySQL Database
    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    const result = await conn.query("SELECT * FROM registrar WHERE student_id = ?", [id]);
  
    //result[0] = data
    res.send(result[0]);
    //when fin close connection to database
    conn.release();
  });

module.exports = router