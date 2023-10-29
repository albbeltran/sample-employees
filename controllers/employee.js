const Employee = require('../models/Employee');

async function login(req, res) {
    try {
        const employee = new Employee(req.body);
        await employee.login();
        res.redirect('/');
    } catch {
        res.send('FAILED');
    }
}

async function home(req, res) {
    try {
        const employee = new Employee(req.body);
        const employees = await employee.search();
        res.render('home', employees);
    } catch {
        res.send('FAILED');
    }
}

exports.login = login;
exports.home = home;