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
if(connection) {
  console.log("database connected");
}

// const {listEmployees, listEmployeesManager, listEmployeesTitle, listEmployeesDepartment} = require('./lib/Employees.js');
//view all employees

//View all roles
listRoles = () => {
  console.log("All Employees");
  connection.query(`SELECT * FROM role`, function(err, res) {
      if(err) throw err;
      console.table(res);
      connection.end();
  });
};

listRoles();
// view all departments

//view all managers

