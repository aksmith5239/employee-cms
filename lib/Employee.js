const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('../db/db.js');
const inquirer = ('inquirer');
// connection.connect(err => {
//   if (err) throw err;
// });
// if(connection) {
// console.log("database connected");
// }

 listEmployees = () => {
    console.log("All Employees");
    connection.query(`SELECT employee.*, role.title, department.name AS department, CONCAT(manager.first_name," ", manager.last_name)AS manager FROM employee
    LEFT JOIN 
    role ON employee.role_id = role.id
    RIGHT JOIN 
    department ON role.department_id = department.id 
    LEFT JOIN
    manager ON employee.manager_id = manager.id
    ORDER BY employee.last_name`, function(err, res) {
        if(err) throw err;
        console.table(res);
    });
  };
  
  // //view all employees by department
  listEmployeesDepartment= () => {
    console.log("All Employees By Department");
    connection.query(`SELECT employee.*, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, manager.last_name)AS manager FROM employee
    LEFT JOIN 
    role ON employee.role_id = role.id
    RIGHT JOIN 
    department ON role.department_id = department.id 
    LEFT JOIN
    manager ON employee.manager_id = manager.id 
    ORDER BY department`, function(err, res) {
        if(err) throw err;
        console.table(res);
        
    });
  };
  
  //view all employees by department
  listEmployeesTitle = () => {
    console.log("All Employees By Title");
    connection.query(`SELECT employee.*, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, manager.last_name)AS manager FROM employee
                    LEFT JOIN 
                    role ON employee.role_id = role.id
                    RIGHT JOIN 
                    department ON role.department_id = department.id 
                    LEFT JOIN
                    manager ON employee.manager_id = manager.id
                    ORDER BY title`, function(err, res) {
        if(err) throw err;
        console.table(res);
        
    });
  };
   
  // //view all employees by manager
  listEmployeesManager = () => {
    console.log("All Employees By Manager");
    connection.query(`SELECT employee.*, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, manager.last_name)AS manager FROM employee
                    LEFT JOIN 
                    role ON employee.role_id = role.id
                    RIGHT JOIN 
                    department ON role.department_id = department.id 
                    LEFT JOIN
                    manager ON employee.manager_id = manager.id
                    ORDER BY manager.last_name`, function(err, res) {
        if(err) throw err;
        console.table(res);
        
    });
  };
  
  
  removeEmployee = () => {
    console.log("Delete an Employee");
    connection.query(`DELETE FROM employee WHERE employee.id = ?`, [8], (err, res) => {
      if (err) throw err;
      console.log(`Deleted ${res.affectedRows} row(s)`);
      
    });
  }

  updateEmployee = () => {
    connection.query(`UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`, 
    ['Raven', 'Darkholme', 2, 3, 6], (err, res) => {
      if(err) throw err;
      console.log(`Updated ${res.changedRows} row(s)`);
    });
  }

  module.exports = {
    listEmployees,
    listEmployeesDepartment,
    listEmployeesTitle,
    listEmployeesManager
  };
 