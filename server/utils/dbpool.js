
const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "W1_89756_Santoshi",
    password: "manager",
    database: "sajb1"
})

module.exports = pool
