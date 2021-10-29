const express = require('express');
const pool = require('./config/mysql')
const app = express();

const student = require("./route/student")


app.use("/student", student)

app.get('/', (req, res) => {
    res.send("Successful!")
});



app.listen(3000, () => console.log("Schedu app is listening on port 3000"))