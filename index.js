const inquirer = require('inquirer');

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
        console.log(response.choice1)
        switch(response.choice1) {
            case 'View All Employees':
                ViewAllEmployees();
                Menu();
                break;

            case 'Add Employee':
                AddEmployee();
                Menu();
                break;

            case 'Update Employee Role':
                UpdateEmployeeRole();
                Menu();
                break;

            case 'View All Roles':
                ViewAllRoles();
                Menu();
                break;

            case 'Add Role':
                AddRole();
                Menu();
                break;

            case 'View All Departments':
                ViewAllDepartments();
                Menu();
                break;

            case 'Add Department':
                AddDepartment();
                Menu();
                break;

            case 'Quit':
                repeat = false;
        }
    })
}

function ViewAllEmployees() {

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