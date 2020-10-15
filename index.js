// const PORT =  process.env.PORT || 3001;
const db = require('./db/employees.db');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alli2968',
    database: 'employees'
  });

connection.connect(err => {
    if (err) throw err;
});


listEmployees = () => {
    console.log("Find All Employees");
    connection.query(`SELECT * FROM employee`, function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });
};

listEmployees();


