const express = require('express');
const pool = require('./config/mysql')
const app = express();

const student = require("./route/student")
const subject = require("./route/subject")
const teacher = require("./route/teacher")
const registrar = require("./route/registrar")

app.use("/student", student)
app.use("/subject", subject)
app.use("/teacher", teacher)
app.use("/registrar", registrar)

app.get('/health', (req, res) => {
    res.send("Express server is good")
});


app.listen(3000, () => console.log("Schedu app is listening on port 3000"))