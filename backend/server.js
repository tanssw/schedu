const express = require('express');
const pool = require('./config/mysql')
const mongoose = require('mongoose')
const app = express();


const student = require("./route/student")
const subject = require("./route/subject")
const teacher = require("./route/teacher")
const registrar = require("./route/registrar")
const teach = require("./route/subject_teacher")
const event = require("./route/event")
const user = require("./route/users")
const appointment = require("./route/appointment")
const noti = require("./route/notification")

app.use(express.json());

app.use("/student", student)
app.use("/subject", subject)
app.use("/teacher", teacher)
app.use("/registrar", registrar)
app.use("/teach", teach)
app.use("/event", event)
app.use("/user", user)
app.use("/appointment", appointment)
app.use("/noti", noti)

app.get('/health', (req, res) => {
    res.send("Express server is good")
});


app.listen(3000, () => console.log("Schedu app is listening on port 3000"))