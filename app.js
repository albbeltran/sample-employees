const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

const router = require('./router');

dotenv.config();

const port = process.env.PORT;

// middleware

app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

// view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// router
app.use('/', router);

// cors
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}));

// endpoints

app.put('/empleado/:id', (req, res) => {
    // update employee
    let exists = false;

    for (let index = 0; index < employees.length; index++) {
        if (employees[index].id === req.params.id) {
            exists = true;
            employees[index]
            break;
        }
    }

    if (!exists) res.sendStatus(400);
})

app.delete('/empleado/:id', (req, res) => {
    console.log(req.params.id)

    let exists = false;

    for (let index = 0; index < employees.length; index++) {
        if (employees[index].id === req.params.id) {
            exists = true;
            employees.splice(index, 1);
            res.send(200);
            break;
        }
    }

    console.log(employees);

    // if employee does not exist
    // this should not happen
    if (!exists) res.sendStatus(500);
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})