const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('../db/db.js');
//View all managers
listManagers = () => {
    console.log("All Managers");
    const sql = connection.query(`SELECT *
    FROM manager
    ORDER BY last_name`, function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
    });
  };
  
  // listManagers();
  
  addNewManager = () => {
    // currently the parameters are hard coded -  need to make these dynamic based on results from inquirer prompt
    const manager = {first_name: 'Bruce', last_name: 'Wayne', title: 'Tracking Manager', department_id: 2};
    connection.query(`INSERT INTO manager SET ?`, manager, (err, res) => {
      if (err) throw err;
      console.log('Last insert ID: ', res.insertId);
    });
    connection.end();
  }
  
  // addNewManager();
  
  removeManager = () => {
    console.log("Delete a manager");
    connection.query(`DELETE FROM manager WHERE id = ?`, [3], (err, res) => {
      if (err) throw err;
      console.log(`Deleted ${res.affectedRows} row(s)`);
      connection.end();
    });
  }
  // removeManager();
  
  
  updateManager = () => {
    connection.query(`UPDATE manager  SET  first_name = ?, last_name = ?, title = ?, department_id = ? WHERE id = ?`, 
    ['Diana', 'Prince', 'Cheif Analyst' , 1, 2], (err, res) => {
      if(err) throw err;
      console.log(`Updated ${res.changedRows} row(s)`);
      connection.end();
    });
  }
  
  module.exports = {listManagers, addNewManager, removeManager, updateManager };