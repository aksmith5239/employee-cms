const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alli2968',
    database: 'employees'
  });

// connection.end();


module.exports = connection;
