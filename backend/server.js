require('dotenv').config({ path: './.env' })

// Express
const express = require('express')
const morgan = require('morgan')

// Routers
const auth = require('./routers/auth')
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

// Initialize Express Application
const app = express()
app.use(morgan('tiny'))
app.use(express.json())

// Active Routers
app.use("/auth", auth)
app.use("/appointment", appointment)
app.use("/account", account)
app.use("/event", event)
app.use("/registrar", registrar)

// Inactive Routers
app.use("/notification", notification)

app.get('/health', (req, res) => {
    res.send("Express server is good")
})

app.listen(PORT, () => console.log("Schedu app is listening on port 3000"))