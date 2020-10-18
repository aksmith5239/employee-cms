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

listEmployees = () => {
    console.log("All Employees");
    connection.query(`SELECT employee.*, role.title, department.name AS department, CONCAT(manager.first_name, manager.last_name)AS manager FROM employee
    LEFT JOIN 
    role ON employee.role_id = role.id
    RIGHT JOIN 
    department ON role.department_id = department.id 
    LEFT JOIN
    manager ON employee.manager_id = manager.id
    ORDER BY employee.last_name`, function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });
  };
  
  listEmployees();
  
  // //view all employees by department
  listEmployeesDepartment = () => {
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
        connection.end();
    });
  };
  
  // // listEmployeesDepartment();
  
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
        connection.end();
    });
  };
  
  // listEmployeesTitle();
  
  
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
        connection.end();
    });
  };
  

// Need to make these queries dynamic based on input from inquirer prompt.


  addNewEmployee = () => {
    // currently the parameters are hard coded -  need to make these dynamic based on results from inquirer prompt
    const role = {first_name: 'Chuck', last_name: 'Cheese', role_id: 1, manager_id: 2};
    connection.query(`INSERT INTO employee SET ?`, role, (err, res) => {
      if (err) throw err;
      console.log('Last insert ID: ', res.insertId);
    });
    connection.end();
  };

  // addNewEmployee();
  
  removeEmployee = () => {
    console.log("Delete an Employee");
    connection.query(`DELETE FROM employee WHERE employee.id = ?`, [8], (err, res) => {
      if (err) throw err;
      console.log(`Deleted ${res.affectedRows} row(s)`);
      connection.end();
    });
  }

  updateEmployee = () => {
    connection.query(`UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`, 
    ['Raven', 'Darkholme', 2, 3, 6], (err, res) => {
      if(err) throw err;
      console.log(`Updated ${res.changedRows} row(s)`);
      connection.end();
    });
  }


  // listEmployeesManager();