// Model for employee with connection to database
const fetch = require('node-fetch');

class Employee {
    constructor(data) {
        this.data = data;
    }
}

Employee.prototype.path = 'https://mocki.io/v1/80cbc9e5-2e9a-42a0-a6f5-a5c5f6a294e7';

Employee.prototype.login = function () {
    // verify employee's dpto is RRHH
    // verify password

    return new Promise(async (resolve, reject) => {
        const data = await fetch(this.path);
        const employees = await data.json();

        let exists = false;

        for (let index = 0; index < employees.length; index++) {
            if (employees[index].id === this.data.id) {
                exists = true;

                // if employee dpto is RRHH and password is correct send 200 success code
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

Employee.prototype.search = function() {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetch(this.path);
            const employees = await data.json();
            resolve(employees);
        } catch {
            reject();
        }
        
    })
}

module.exports = Employee;