const express = require('express');
const router = express.Router();

// controllers
const employeeController = require('./controllers/employee'); 

// routes
router.post('/login', employeeController.login);

router.get('/', employeeController.home);

router.get('/empleado/:id', employeeController.ifEmployeeExists);

module.exports = router;