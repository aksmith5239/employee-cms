// once all employee sql tests are working - modularize employees here: 
//create employee class:

class Employee {
    constructor(first_name, last_name, title, role_id, manager_id, id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.title = title;
        this.role_id = role_id;
        this.manager_id = manager_id;
        this.id = id;
    }

//view all employees
listEmployees = () => {
    console.log("All Employees");
    connection.query(`SELECT employee.*, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, manager.last_name)AS manager FROM employee
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

// listEmployees();

//view all employees by department
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

// listEmployeesDepartment();

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
                    ORDER BY manager.last_name`, function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });
};

//Add an employee

//Remove an employee

//Update employee role

//update employee manager



} // end class