//View all departments
listDepartments = () => {
    console.log("All Departments");
    const sql = connection.query(`SELECT department.id, department.name AS department 
    FROM department
    ORDER BY department`, function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });
  };
  
  // listDepartments();
  
  addNewDepartment = () => {
    // currently the parameters are hard coded -  need to make these dynamic based on results from inquirer prompt
    const department = {name: 'Adminsitrative Services'};
    connection.query(`INSERT INTO department SET ?`, department, (err, res) => {
      if (err) throw err;
      console.log('Last insert ID: ', res.insertId);
    });
    connection.end();
  }
  
  // addNewDepartment();
  
  removeDepartment = () => {
    console.log("Delete a department");
    connection.query(`DELETE FROM department WHERE department.id = ?`, [4], (err, res) => {
      if (err) throw err;
      console.log(`Deleted ${res.affectedRows} row(s)`);
      connection.end();
    });
  }
  // removeDepartment();
  
  
  updateDepartment = () => {
    connection.query(`UPDATE department  SET  name = ? WHERE id = ?`, 
    ['Data Systems', 3], (err, res) => {
      if(err) throw err;
      console.log(`Updated ${res.changedRows} row(s)`);
      connection.end();
    });
  }
  
  // updateDepartment();