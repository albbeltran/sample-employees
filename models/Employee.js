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

            if (!(attemptedEmployee[0].department === 'RRHH')) reject('Empleado no autorizado');
            if (!(attemptedEmployee[0].password === this.data.password)) reject('Contraseña incorrecta.');

            resolve(attemptedEmployee);
        } catch {
            reject('Expediente no registrado.');
        }

    })
}

Employee.prototype.register = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const employee = await query('SELECT id, name, department FROM employees WHERE id = ?', [id]);
            if(employee) reject("Expediente en uso.");

            await query("INSERT INTO employees_sample.employees(id,name,password,department) VALUES (?, ?, ?, ?)",
                [this.data.id, this.data.name, this.data.password, this.data.department])

            resolve();
        } catch {
            reject("Expediente en uso.");
        }
    })
}

Employee.prototype.update = function () {
    return new Promise(async (resolve, reject) => {
        try {
            await query('UPDATE employees SET name = ?, department = ? WHERE id = ?',
                [this.data.name, this.data.department, this.data.id]);

            resolve();
        } catch {
            reject('Error al actualizar los datos.');
        }
    })
}

Employee.prototype.remove = function () {
    return new Promise(async (resolve, reject) => {
        try {
            await query('DELETE FROM employees WHERE id = ?', [this.data]);
            resolve();
        } catch {
            reject('Expediente no registrado.')
        }
    })
}

Employee.prototype.getAllEmployees = function () {
    return new Promise(async (resolve, reject) => {
        try {
            const employees = await query('SELECT id, name, department FROM employees', []);
            resolve(employees);
        } catch {
            reject('Error al realizar la consulta.');
        }
    })
}

// Find the username to load Employee page
Employee.findById = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            const employee = await query('SELECT id, name, department FROM employees WHERE id = ?', [id]);

            if(employee.length) resolve(employee[0]);
            reject("Expediente no registrado.");
        } catch {
            reject("Expediente no registrado.");
        }
    })
}

module.exports = Employee;