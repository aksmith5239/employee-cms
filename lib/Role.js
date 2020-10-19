const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('../db/db.js');
//View all roles
listRoles = () => {
    console.log("All Employees");
    const sql = connection.query(`SELECT role .*, department.name AS department 
    FROM role
    LEFT JOIN department ON role.department_id = department.id`, function(err, res) {
        if(err) throw err;
        console.table(res);
       
    });
  };
  
  // listRoles();
  
  addNewRole = () => {
    // currently the parameters are hard coded -  need to make these dynamic based on results from inquirer prompt
    const role = {title: 'Committee Specialist', salary: '35000', department_id: 1};
    connection.query(`INSERT INTO role SET ?`, role, (err, res) => {
      if (err) throw err;
      console.log('Last insert ID: ', res.insertId);
    });
   
  }
  
  // addNewRole();
  
  removeRole = () => {
    console.log("Delete a role");
    connection.query(`DELETE FROM role WHERE role.id = ?`, [7], (err, res) => {
      if (err) throw err;
      console.log(`Deleted ${res.affectedRows} row(s)`);
      
    });
  }
  // removeRole();
  
  
  updateRole = () => {
    connection.query(`UPDATE role  SET  title = ?, salary = ?, department_id = ? WHERE id = ?`, 
    ['Senior Committee Tracker', '40000', 2, 2], (err, res) => {
      if(err) throw err;
      console.log(`Updated ${res.changedRows} row(s)`);
      
    });
  }
  
  module.exports = {listRoles, updateRole, removeRole, addNewRole };