const mysql = require("mysql2/promise")
//request env value in .env file
require('dotenv').config({ path: '../.env' })

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'schedu',
})
module.exports = pool