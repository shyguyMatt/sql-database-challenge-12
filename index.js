const inquirer = require('inquirer');
const mysql = require('mysql2');

 const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    }
 );

Menu();

function Menu() {
    inquirer
    .prompt([
        {
            type: 'list',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ],
            message: 'What would you like to do?',
            name: 'choice1'
        }
    ])
    .then((response) => {
        switch(response.choice1) {
            case 'View All Employees':
                ViewAllEmployees();
                break;

            case 'Add Employee':
                AddEmployee();
                break;

            case 'Update Employee Role':
                UpdateEmployeeRole();
                break;

            case 'View All Roles':
                ViewAllRoles();
                break;

            case 'Add Role':
                AddRole();
                break;

            case 'View All Departments':
                ViewAllDepartments();
                break;

            case 'Add Department':
                AddDepartment();
                break;

            case 'Quit':
                process.exit();
        }
        Menu();
    })
}

function ViewAllEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.log(results);
    })
}

function AddEmployee() {

}

function UpdateEmployeeRole() {

}

function ViewAllRoles() {

}

function AddRole() {

}

function ViewAllDepartments() {

}

function AddDepartment() {

}