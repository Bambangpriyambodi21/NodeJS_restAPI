const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwer1234",
    database: "universitas"
});

module.exports = db
