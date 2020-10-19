const connection = require('./db/db.js')
const database = require('./db/employees.db');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const {listEmployees} = require("./lib/Employee.js");
const {listDepartments} = require('./lib/Department.js');
const {listRoles} = require('./lib/Role.js');
const {listManagers} = require('./lib/Manager.js');

connection.connect(err => {
  if (err) throw err;
});
if(connection) {
console.log("database connected");
}
console.log(`
  ============================
  Employee Management System
  ============================
  `);

promptLists = () => {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'lists',
      message: 'What would you like to do next?',
      choices: ['View Employees', 'View Departments', 'View Roles', 'View Managers', 'Finish ']
   
    }
  ])
  .then(answers => {
    if(answers.lists === 'View Employees') {
      console.log("Go to Employees list");
      listEmployees();
      promptEmployeeActions();
    } 
    else if(answers.lists === 'View Departments'){
      console.log("Go to Departments list");
      listDepartments();
      promptDepartmentActions();
    } 

    else if(answers.lists === 'View Roles'){
      console.log("Go to Roles list");
      listRoles();
      promptRoleActions();
    } 
    else if(answers.lists === 'View Managers'){
      console.log("Go to Managers list");
      listManagers();
      promptManagerActions();
    } 
    else {
      console.log("Goodbye");
      process.exit();
    }
  })
}

promptEmployeeActions = () => {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Choose an Employee Task.',
      choices: ['Add Employees', 'Update Employees', 'Delete Employee', 'Another Task', 'Finish ']
   
    }
  ])
  .then(answers => {
    if(answers.employee === 'Add Employees') {
      console.log("Add Employees Here");
      addEmployee();
    } else if(answers.employee === 'Update Employees') {
      console.log("Update Employees & Employee Role Here");
      updateEmployee();
    }
    else if(answers.employee === 'Delete Employee') {
      console.log("Delete Employee Here");
      removeEmployee();
    }
    else if(answers.employee === 'Another Task') {
      console.log("View Company Lists");
      promptLists();
    }
    
    else {
      console.log("Goodbye");
      process.exit();
    }
  })
}

promptRoleActions = () => {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'roles',
      message: 'Choose a Role Task',
      choices: ['Add Role', 'Another Task', 'Finish ']
   
    }
  ])
  .then(answers => {
    if(answers.roles === 'Add Role') {
      console.log("Add Roles Here");
      addRole();
  
    } 
    else if(answers.roles === 'Another Task') {
      console.log("View Company Lists");
      promptLists();
    }
    
    else {
      console.log("Goodbye");
      process.exit();
    }
  })
}

promptDepartmentActions = () => {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'departments',
      message: 'Choose a Department Task',
      choices: ['Add Department', 'Another Task', 'Finish ']
   
    }
  ])
  .then(answers => {
    if(answers.departments === 'Add Department') {
      console.log("Add Department Here");
      return inquirer .prompt([
        {
          type: 'input',
          name: 'name',
          message: "Enter a department name"

        }
      ])
      .then(answers => {
        console.log(answers.name);
        const department = (answers.name);
       
        const sql = `INSERT INTO department (name)
        VALUES (?)`
        const params = [department]
        connection.query(sql, params, function(err, result) {
          if(err) {
            console.log(err);
          }
          console.log("Department added successfully!");
        });
          promptLists();
        });


    } 
    else if(answers.departments === 'Another Task') {
      console.log("View Company Lists");
      promptLists();
    }
    
    else {
      console.log("Goodbye");
      process.exit();
    }
  })
}

promptManagerActions = () => {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'managers',
      message: 'Choose a Manager Task',
      choices: ['Add Manager', 'Update Manager', 'Another Task', 'Finish ']
   
    }
  ])
  .then(answers => {
    if(answers.managers === 'Add Manager') {
      console.log("Add Manager Here");
      // listEmployees();
      // promptLists();
    } else if(answers.managers === 'Update Manager') {
      console.log("Update Manager Here");

    }
    else if(answers.managers === 'Delete Manager') {
      console.log("Delete Manager Here");

    }
    else if(answers.managers === 'Another Task') {
      console.log("View Company Lists");
      promptLists();
    }
    
    else {
      console.log("Goodbye");
      process.exit();
    }
  })
}


addRole = () => {

  connection.promise().query(`SELECT name, id FROM department`)
  .then(([rows]) => {
    var departments = rows.map(({ name, id }) => ({
        name: name,
        value: id
  
    }));

  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "Enter a Title"
  
    }, 
    {
      type: 'input',
      name: 'salary',
      message: "Enter a Salary"
  
    },
    {
      type: 'list',
      name: 'department_id',
      message: "Enter a Department",
      choices: departments
    }
  ])
  .then(answers => {
   const departments = answers.department_id;
    const title = answers.title;
    const salary = answers.salary;
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?)`
    const params = [title, salary, departments]
    connection.query(sql, params, function(err, result) {
      if(err) {
        console.log(err);
      }
      console.log("Role added successfully!");
    });
      promptLists();
    });
  });
}

addEmployee = () => {
  connection.promise().query(`SELECT title, id FROM role`)
  .then(([rows]) => {
    var roles = rows.map(({ title, id }) => ({
        name: title,
        value: id
  
    }));
  return inquirer .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "Enter an employee first name"

    }, 
    {
      type: 'input',
      name: 'last_name',
      message: "Enter an employee last name"

    }, 
    {
      type: 'list',
      name: 'role_id',
      message: "Enter the employee's role",
      choices: roles
    }, 
    {
      type: 'list',
      name: 'manager_id',
      message: "Enter the manager",
      choices: [ 'Speedy Gonzales', 'Olive Oyl', 'Wiley Coyote']

    }
  ])
  .then(answers => {
    const firstName = answers.first_name;
    const lastName = answers.last_name;
    const roleID = answers.role_id;
    var managerID = answers.manager_id;

    // switch(roleID) {
    //   case 'Analysis':
    //     roleID = 1;
    //     break;
    //   case 'Tracking':
    //     roleID = 2;
    //     break; 
    //   case 'Data':
    //     roleID = 3;
    //     break;   
    // }
    switch(managerID) {
      case 'Speedy Gonzales':
        managerID = 1;
        break;
      case 'Diana Prince':
        managerID = 2;
        break; 
      case 'Wiley Coyote':
        managerID = 3;
        break;   
    }

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`
    const params = [firstName, lastName, roleID, managerID]
    connection.query(sql, params, function(err, result) {
      if(err) {
        console.log(err);
      }
      console.log("Employee added successfully!");
    });
      promptLists();
    });
  });
}

updateEmployee = () => {

connection.promise().query(`SELECT last_name, id FROM employee`)
.then(([rows]) => {
  var employees = rows.map(({ last_name, id }) => ({
      name: last_name,
      value: id

  }));

  return inquirer .prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Select an EMPLOYEE',
      choices: employees

    },
    {
      type: 'input',
      name: 'first_name',
      message: "Enter an employee first name"

    }, 
    {
      type: 'input',
      name: 'last_name',
      message: "Enter an employee last name"

    }, 
    {
      type: 'list',
      name: 'role_id',
      message: "Enter the employee's role",
      choices: [ 'Analysis', 'Tracking', 'Data']
     
    }, 
    {
      type: 'list',
      name: 'manager_id',
      message: "Enter the manager",
      choices: [ 'Speedy Gonzales', 'Olive Oyl', 'Wiley Coyote']

    }
  ])
  .then(answers => {
    const employeeID = answers.employee;
    const firstName = answers.first_name;
    const lastName = answers.last_name;
    var roleID = answers.role_id;
    var managerID = answers.manager_id;

    switch(roleID) {
      case 'Analysis':
        roleID = 1;
        break;
      case 'Tracking':
        roleID = 2;
        break; 
      case 'Data':
        roleID = 3;
        break;   
    }
    switch(managerID) {
      case 'Speedy Gonzales':
        managerID = 1;
        break;
      case 'Diana Prince':
        managerID = 2;
        break; 
      case 'Wiley Coyote':
        managerID = 3;
        break;   
    }

    const sql = `UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`
    const params = [firstName, lastName, roleID, managerID, employeeID]
    connection.query(sql, params, function(err, result) {
      if(err) {
        console.log(err);
      }
      console.log("Employee updated successfully!");
    });
      promptLists();
    });
});
}

removeEmployee = () => {
  connection.promise().query(`SELECT last_name, id FROM employee`)
.then(([rows]) => {
  var employees = rows.map(({ last_name, id }) => ({
      name: last_name,
      value: id

  }));

  return inquirer .prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Select an EMPLOYEE',
      choices: employees

    }
  ])
  .then(answers => {
    const employeeID = answers.employee;
    const sql = `DELETE FROM employee WHERE id = ?`
    const params = [employeeID]
    connection.query(sql, params, function(err, result) {
      if(err) {
        console.log(err);
      }
      console.log("Employee deleted successfully!");
    });
      promptLists();
    });
});
}

promptLists();

