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

// main inquirer function menu
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
        // switch case for all possible choices
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
            
            default: 
                break;
        }
    })
}

// retrieves and logs all employees
function ViewAllEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.log(results);
    })
    Menu();
}

// adds a new employee, takes input for name role and manager id
// id is auto incrmented
function AddEmployee() {
    var roles = [];
    var managers = [];
    db.query('SELECT id, title FROM roles', function (err, results) {
        for(x in results) {
            roles.push(`${results[x].id}`)
        }
    })
    db.query('SELECT first_name, last_name, manager_id FROM employees', function (err, results) {
        for(x in results) {
            managers.push(`${results[x].manager_id}`)
        }
    })
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name'
            },
            {
                type: 'list',
                choices: roles,
                name: 'role_id',
                message: 'Select the title'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager id if any'
            }
        ])
        .then((response) => {
            var manager_id = '';
            if(response.manager_id < 0) manager_id = response.manager_id;
            else manager_id = 0;
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
            [response.first_name, response.last_name, response.role_id, response.manager_id])            
            Menu();
        })

}

// updates employee roles takes input for employee and new role
function UpdateEmployeeRole() {
    var employees = [];
    var roles = [];
    db.query('SELECT first_name, last_name, id FROM employees', function (err, results) {
        for(x in results) {
            employees.push(`${results[x].id}`)
        }
    });
    db.query('SELECT id, title FROM roles', function (err, results) {
        for(x in results) {
            roles.push(`${results[x].id}`);
        }
    });
    inquirer
        .prompt([
            {
                type: 'list',
                choices: employees,
                name: 'employee',
                message: 'Select an employee to update'
            },
            {
                type: 'list',
                choices: roles,
                name: 'role',
                message: 'Select a new role for the employee'
            }
        ])
        .then((response) => {
            db.query('UPDATE employees SET role_id = ? WHERE id = ?',
            [response.employee, response.role]);
            Menu();
        })
}


// displays all roles
function ViewAllRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.log(results);
    })
    Menu();
}


// adds a new role takes input for role id, salary, and department
function AddRole() {
    var departments = []
    db.query('SELECT id, dpt_name FROM departments', function (err, results) {
        for(x in results) {
            departments.push(`${results[x].id}`)
        }
    })
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the new role'
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter the id of the new role'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the new role'
            },
            {
                type: 'list',
                choice: departments,
                name: 'department',
                message: 'Select the department for the role'
            }
        ])
        .then((response) => {
            db.query('INSERT INTO roles (id, title, salary, department_id) VALUES (?,?,?,?)',
            [response.id, response.title, response.salary, response.department])
            Menu();
        })
}


// displays all departments
function ViewAllDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
    })
    Menu();
}


// adds a new department takes input for department id and name
function AddDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'dpt_name',
                message: 'Enter the name of the new department'
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter the id of the new department'
            }
        ])
        .then((response) => {
            db.query('INSERT INTO departments (id, dpt_name) VALUES (?, ?);',
            [response.id, response.dpt_name])
            Menu();
        })
}