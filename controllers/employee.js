const Employee = require('../models/Employee');

async function login(req, res) {
    try {
        const employee = new Employee(req.body);
        await employee.login();
        res.redirect('/');
    } catch {
        res.sendStatus(400);
    }
}

async function home(req, res) {
    try {
        const employee = new Employee(req.body);
        const employees = await employee.getAllEmployees();
        res.render('home', { employees });
    } catch {
        res.sendStatus(400);
    }
}

async function ifEmployeeExists(req, res) {
    try {
        const employee = await Employee.findById(req.params.id);
        res.render('employee', { employee });
    } catch {
        res.sendStatus(400);
    }
}

async function register(req, res) {
    try {
        const employee = new Employee(req.body);
        const employees = await employee.register();
        res.render('home', { employees });
    } catch {
        res.sendStatus(400);
    }
}

async function update(req, res) {
    try {
        const employee = new Employee(req.body);
        // first we check if employee exists
        await Employee.findById(req.params.id);
        // update the employee
        const employees = await employee.update();
        res.render('home', { employees });
    } catch {
        res.sendStatus(400);
    }
}

async function remove(req, res) {
    try {
        const employee = new Employee(req.params.id);
        // first we check if employee exists
        await Employee.findById(req.params.id);
        // remove the employee
        const employees = await employee.remove();
        res.render('home', { employees });
    } catch {
        res.sendStatus(400);
    }
}

exports.login = login;
exports.home = home;
exports.ifEmployeeExists = ifEmployeeExists;
exports.register = register;
exports.update = update;
exports.remove = remove;