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
            const employees = await this.getAllEmployees();
            let exists = false;

            for (let index = 0; index < employees.length; index++) {
                if (employees[index].id === this.data.id) {
                    exists = true;
                    reject();
                    break;
                }
            }

            if (!exists) {
                employees.push(this.data);
                resolve(employees);
            }
        } catch {
            reject();
        }
    })
}

Employee.prototype.update = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const index = await this.getEmployeeIndex(this.data.id);
            const employees = await this.getAllEmployees();

            employees[index].id = this.data.id;
            employees[index].name = this.data.name;
            employees[index].department = this.data.department;

            resolve(employees);

        } catch {
            reject()
        }
    })
}

Employee.prototype.remove = function () {
    return new Promise(async (resolve, reject) => {
        try {
            // this.data equals to req.params.id
            const index = await this.getEmployeeIndex(this.data);
            const employees = await this.getAllEmployees();

            employees.splice(index, 1);

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
            // need to access prototype method because findById it's not an Employee method
            const employees = await Employee.prototype.getAllEmployees();

            let exists = false;

            for (let index = 0; index < employees.length; index++) {
                if (employees[index].id === id) {
                    exists = true;
                    resolve(employees[index]);
                    break;
                }
            }

            if (!exists) reject();
        } catch {
            reject()
        }
    })
}

// get employee index for internal methods such as update and remove
Employee.prototype.getEmployeeIndex = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const employees = await this.getAllEmployees();

            for (let index = 0; index < employees.length; index++) {
                if (employees[index].id === id) resolve(index);
            }
        } catch {
            reject();
        }
    });
}

module.exports = Employee;