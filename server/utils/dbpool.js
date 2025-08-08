
const mysql = require("mysql2")

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "W1_Amruta_89555",
    password: "amruta",
    database: "sajb"
})

module.exports = pool
