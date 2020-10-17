// once all employee sql tests are working - modularize employees here: 
//create employee class:

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
  
  addEmployee = (first_name, last_name, role_id, manager_id) => {
    console.log("Add an Employee");
    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES 
                    (?, ?, ?, ?)` , function(err, res) {
      if(err) throw err;
      console.log(res + "has been entered into the database");
      return(res);
      connection.end();
    })
  }
  
  removeEmployee = (id) => {
    console.log("Add an Employee");
    connection.query(`DELETE FROM employee WHERE employee.id = ?` , function(err, res) {
      if(err) throw err;
      console.log(res);
      return(res);
      connection.end();
    })
  }
  
  updateEmployee = () => {
    console.log("Update Employee");
    connection.query(`UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`, function(err, res) {
      if(err)throw err;
      console.log(res);
      connection.end;
    })
  }

  // listEmployeesManager();