const express = require('express');
const router = express.Router();

// controllers
const employeeController = require('./controllers/employee'); 

// post methods
router.post('/login', employeeController.login);
router.post('/empleado', employeeController.register);

// get methods
router.get('/', employeeController.home);
router.get('/empleado/:id', employeeController.ifEmployeeExists);

module.exports = router;