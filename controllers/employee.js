const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyToken(req, res, next) {
    token = req.cookies.jwt;

    if (!token) {
        res.render('index');
    } else {
        jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
            if (err) res.render('index');
            else next();
        });
    }
}

async function login(req, res) {

    try {
        const employee = new Employee(req.body);
        const employeeAuth = await employee.login();

        const employeeForToken = {
            id: employeeAuth[0].id,
        }

        const token = jwt.sign({ id: employeeForToken.id }, process.env.JWTSECRET, { expiresIn: '1d' });

        res.cookie('jwt', token);
        res.redirect('/');
    } catch {
        res.sendStatus(400);
    }
}

async function home(req, res) {
    try {
        const employee = new Employee();
        const employees = await employee.getAllEmployees();
        res.render('home', { employees });
    } catch {
        res.sendStatus(400);
    }
}

async function ifEmployeeExists(req, res) {
    try {
        const employee = await Employee.findById(req.query.id);
        console.log(employee)
        res.render('employee', { employee: employee[0] });
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
        // await Employee.findById(req.params.id);
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

exports.verifyToken = verifyToken;
exports.login = login;
exports.home = home;
exports.ifEmployeeExists = ifEmployeeExists;
exports.register = register;
exports.update = update;
exports.remove = remove;