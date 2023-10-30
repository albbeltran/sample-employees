const { query } = require('../database/db');

class Employee {
    constructor(data) {
        this.data = data;
    }
}

Employee.prototype.login = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const attemptedEmployee = await query('SELECT * FROM employees WHERE id = ?', [this.data.id]);

            if (attemptedEmployee[0].department === 'RRHH'
                && attemptedEmployee[0].password === this.data.password) {
                resolve(attemptedEmployee);
            }

            reject();
        } catch {
            reject();
        }

    })
}

Employee.prototype.register = function () {
    return new Promise(async (resolve, reject) => {
        try {
            await query("INSERT INTO employees_sample.employees(id,name,password,department) VALUES (?, ?, ?, ?)",
                [this.data.id, this.data.name, this.data.password, this.data.department])

            const employees = await this.getAllEmployees();

            resolve(employees);
        } catch {
            reject();
        }
    })
}

Employee.prototype.update = function () {
    return new Promise(async (resolve, reject) => {
        try {
            await query('UPDATE employees SET name = ?, department = ? WHERE id = ?',
                [this.data.name, this.data.department, this.data.id]);

            // In MySQL update query doen't return the affected row
            // a new query is required to get the employee updated
            const employee = await Employee.findById(this.data.id);
            
            resolve(employee);
        } catch {
            reject()
        }
    })
}

Employee.prototype.remove = function () {
    console.log('ID TO DELETE: ', this.data);
    return new Promise(async (resolve, reject) => {
        try {
            await query('DELETE FROM employees WHERE id = ?', [this.data]);
            resolve();
        } catch {
            reject()
        }
    })
}

Employee.prototype.getAllEmployees = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const employees = await query('SELECT id, name, department FROM employees', []);
            resolve(employees);
        } catch {
            reject();
        }
    })
}

// Find the username to load Employee page
Employee.findById = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const employee = await query('SELECT id, name, department FROM employees WHERE id = ?', [id]);
            resolve(employee[0]);
        } catch {
            reject()
        }
    })
}

module.exports = Employee;