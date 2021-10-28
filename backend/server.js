const express = require('express');
const pool = require('./mysql')
const app = express();

app.get('/', (req, res) => {
    res.send("Successful!")
});
app.get('/getData', async (req, res) =>{
    //create connection to mySQL Database
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    
    //query student from database
    const result = await conn.query('SELECT * FROM student');

    //result[0] = data
    res.send(result[0])

    //when fin close connection to database
    conn.release();
})

app.listen(3000, () => console.log("Schedu app is listening on port 3000"))