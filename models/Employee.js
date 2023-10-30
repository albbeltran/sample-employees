const { query } = require('../database/db');

class Employee {
    constructor(data) {
        this.data = data;
    }
}

Employee.prototype.path = 'https://mocki.io/v1/80cbc9e5-2e9a-42a0-a6f5-a5c5f6a294e7';

Employee.prototype.login = function () {
    return new Promise(async (resolve, reject) => {
        const employees = await this.getAllEmployees();
        let exists = false;

        for (let index = 0; index < employees.length; index++) {
            if (employees[index].id === Number(this.data.id)) {
                exists = true;

                // verify employee's dpto is RRHH
                // verify password
                if (employees[index].department === 'RRHH'
                    && employees[index].password === this.data.password) {
                    resolve();
                    break;
                }

                // otherwise, send 401 error (No Authorized)
                reject();
                break;
            }
        }
        // Req employee id does not exist
        if (!exists) reject();
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

            const employees = await this.getAllEmployees();

            resolve(employees);
        } catch {
            reject()
        }
    })
}

Employee.prototype.remove = function () {
    return new Promise(async (resolve, reject) => {
        try {
            await query('DELETE FROM employees WHERE id = ?', [this.data]);
            const employees = await this.getAllEmployees();

            resolve(employees);
        } catch {
            reject()
        }
    })
}

Employee.prototype.getAllEmployees = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const employees = await query('SELECT * FROM employees', []);
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
            const employee = await query('SELECT * FROM employees WHERE id = ?', [id]);
            resolve(employee);
        } catch {
            reject()
        }
    })
}

module.exports = Employee;