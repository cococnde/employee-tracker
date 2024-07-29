const pool = require('./db/connection');

module.exports = {
    findAllDepartments: () => {
        const query = 'SELECT * FROM departments';
        return pool.query(query);
    },
    findAllRoles: () => {
        const query = 'SELECT * FROM roles';
        return pool.query(query);
    },
    findAllEmployees: () => {
        const query = 'SELECT * FROM employees';
        return pool.query(query);
    },
    updateEmployeeRole: (employeeID, roleID) => {
        const query = 'UPDATE employees SET role_id = $1 WHERE id = $2';
        return pool.query(query, [roleID, employeeID]);
    },
};