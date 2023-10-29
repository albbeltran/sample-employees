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
        res.render('home', { employees });
    } catch {
        res.send('FAILED');
    }
}

async function ifEmployeeExists(req, res) {
    try {
        console.log(req.params.id)
        const employee = await Employee.findById(req.params.id);
        res.render('employee', { employee });
    } catch {
        res.sendStatus(400);
    }

}

exports.login = login;
exports.home = home;
exports.ifEmployeeExists = ifEmployeeExists;