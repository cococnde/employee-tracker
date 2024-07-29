const inquirer = require('inquirer');
const db = require('/db');

const mainMenu = () => {
    inquirer
        .prompt ([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit'
                ],
            },
        ]).then((answer) => { 
            switch (answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Quit':
                    console.log('Goodbye!');
                    process.exit();
                    break;
            }
        }).catch((error) => {
            console.log('ERROR',error);
        });

};

const viewDepartments = () => {
    db.findAllDepartments()
        .then(([rows]) => {
            console.table(rows);
            mainMenu();
        });
};

const viewRoles = () => {
    db.findAllRoles()
        .then(([rows]) => {
            console.table(rows);
            mainMenu();
        });
};

const viewEmployees = () => {
    db.findAllEmployees()
        .then(([rows]) => {
            console.table(rows);
            mainMenu();
        });
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?',
            },
        ]).then((answer) => {
            db.createDepartment(answer.name)
                .then(() => {
                    console.log('Department added!');
                    mainMenu();
                });
        });
};

const addRole = () => { 
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'input',
                name: 'departmentID',
                message: 'What is the department ID of the role?',
            },
        ]).then((answer) => {
            db.createRole(answer.title, answer.salary, answer.departmentID)
                .then(() => {
                    console.log('Role added!');
                    mainMenu();
                });
        });

    };

const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?',
        },
        { type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?',
        },
        {
            type: 'input',
            name: 'roleID',
            message: 'What is the Role ID of the employee?',
        },
        {
            type: 'input',
            name: 'managerID',
            message: 'Enter the manager ID of the employee',
        },
    ]).then((answer) => { 
        db.createEmployee(answer.firstName, answer.lastName, answer.roleID, answer.managerID)
            .then(() => {
                console.log('Employee added!');
                mainMenu();
            });
    });

};

const updateEmployeeRole = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'employeeID',
            message: 'Enter the ID of the employee to update:',
        },
        {
            type: 'input',
            name: 'roleID',
            message: 'Please enter the role ID for the employee:',
        },
    ]).then((answer) => {
        console.log('employee updated');
        db.updateEmployeeRole(answer.employeeID, answer.roleID)
            .then(() => {
                console.log('Employee role updated!');
                mainMenu();}
            )});
};

    // Call the mainMenu function
    mainMenu();