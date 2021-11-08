require('dotenv').config({ path: './.env' })

// Express
const express = require('express')
const morgan = require('morgan')

// Firebase
const { initializeApp } = require('firebase/app')
const firebaseConfig = require('./secrets/firebaseConfig')

// Routers
const student = require("./route/student")
const subject = require("./route/subject")
const teacher = require("./route/teacher")
const registrar = require("./route/registrar")
const teach = require("./route/subject_teacher")
const event = require("./route/event")
const user = require("./route/users")
const appointment = require("./route/appointment")
const notification = require("./route/notification")

const PORT = process.env.PORT

// Initialize Firebase Application
initializeApp(firebaseConfig)

// Initialize Express Application
const app = express()
app.use(morgan('tiny'))
app.use(express.json())

// Active Routers
app.use("/appointment", appointment)
app.use("/user", user)

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