const Employee = require('../models/Employee');

async function login(req, res) {
    try {
        let employee = new Employee(req.body);
        await employee.login();
        res.render('main');
    } catch {
        res.send('FAILED');
    }
}

exports.login = login;