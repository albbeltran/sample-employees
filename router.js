const express = require('express');
const router = express.Router();

// controllers
const employeeController = require('./controllers/employee'); 

// routes
router.post('/login', employeeController.login);

module.exports = router;