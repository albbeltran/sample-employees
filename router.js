const express = require('express');
const router = express.Router();

// controllers
const employeeController = require('./controllers/employee'); 

// post methods
router.post('/login', employeeController.login);
router.post('/logout', employeeController.logout);
router.post('/empleado', employeeController.register);

// get methods
router.get('/', employeeController.verifyToken, employeeController.home);
router.get('/empleado/:id', employeeController.employeeScreen);

// put methods
router.put('/empleado/:id', employeeController.update);

// delete methods
router.delete('/empleado/:id', employeeController.remove);

// 404 route
router.get('*', employeeController.notFound);

module.exports = router;