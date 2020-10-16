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

//view all employees
listEmployees = () => {
    console.log("All Employees");
    connection.query(`SELECT * FROM employee`, function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });
};

// listEmployees();

//view all employees by department
listEmployeesDepartment = () => {
    console.log("All Employees By Department");
    connection.query(`SELECT employee.*, role.title, role.salary, department.name AS department FROM employee
                    LEFT JOIN 
                    role ON employee.role_id = role.id
                    RIGHT JOIN 
                    department ON role.department_id = department.id ORDER BY department`, function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });
};

// listEmployeesDepartment();

//view all employees by manager

listEmployeesManager = () => {
    console.log("All Employees By Manager");
    connection.query(`SELECT employee.*, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, manager.last_name)AS manager FROM employee
                    LEFT JOIN 
                    role ON employee.role_id = role.id
                    RIGHT JOIN 
                    department ON role.department_id = department.id 
                    LEFT JOIN
                    manager ON employee.manager_id = manager.id
                    ORDER BY manager`, function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });
};

listEmployeesManager();

//create manager table


//Add an employee

//Remove an employee

//Update employee role

//update employee manager