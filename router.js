const express = require('express');
const router = express.Router();

// controllers
const employeeController = require('./controllers/employee'); 

// post methods
router.post('/login', employeeController.login);
router.post('/empleado', employeeController.register);

// get methods
router.get('/', employeeController.verifyToken, employeeController.home);
router.get('/empleado/', employeeController.ifEmployeeExists);

// put methods
router.put('/empleado/', employeeController.update);

// delete methods
router.delete('/empleado/', employeeController.remove);

module.exports = router;