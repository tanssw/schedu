const express = require('express');
const pool = require('./config/mysql')
const mongoose = require('mongoose')

const app = express();

//mongoDB Connection
mongoose.connect('mongodb://localhost:27017/IT_Calenda', { useNewUrlParser: true })
mongoose.connection.on('error', err => {
    console.error('MongoDB error', err)
  })

// app.get('/all', async (req, res) => {

//     const test = await event.find({})
//     res.json(test)

//   })


const student = require("./route/student")
const subject = require("./route/subject")
const teacher = require("./route/teacher")
const registrar = require("./route/registrar")
const teach = require("./route/subject_teacher")
const event = require("./route/event")

app.use(express.json());

app.use("/student", student)
app.use("/subject", subject)
app.use("/teacher", teacher)
app.use("/registrar", registrar)
app.use("/teach", teach)
app.use("/event", event)

app.get('/health', (req, res) => {
    res.send("Express server is good")
});


app.listen(3000, () => console.log("Schedu app is listening on port 3000"))