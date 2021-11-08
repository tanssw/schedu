require('dotenv').config({ path: './.env' })

// Express
const express = require('express')
const morgan = require('morgan')

// Firebase
const { initializeApp } = require('firebase/app')
const firebaseConfig = require('./secrets/firebaseConfig')

// Routers
const account = require("./routers/account")
const appointment = require("./routers/appointment")

const student = require("./routers/student")
const subject = require("./routers/subject")
const teacher = require("./routers/teacher")
const registrar = require("./routers/registrar")
const teach = require("./routers/subject_teacher")
const event = require("./routers/event")
const notification = require("./routers/notification")

const PORT = process.env.PORT

// Initialize Firebase Application
initializeApp(firebaseConfig)

// Initialize Express Application
const app = express()
app.use(morgan('tiny'))
app.use(express.json())

// Active Routers
app.use("/appointment", appointment)
app.use("/account", account)

// Inactive Routers
app.use("/student", student)
app.use("/subject", subject)
app.use("/teacher", teacher)
app.use("/registrar", registrar)
app.use("/teach", teach)
app.use("/event", event)
app.use("/notification", notification)

app.get('/health', (req, res) => {
    res.send("Express server is good")
})

app.listen(PORT, () => console.log("Schedu app is listening on port 3000"))