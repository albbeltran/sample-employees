const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config();

const port = process.env.PORT;


// middleware

app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'PUT', 'POST']
}));

// database

employees = [
    {
        id: '2940',
        name: 'John',
        password: 'RZKQH2',
        department: 'RRHH',
    },
    {
        id: '2950',
        name: 'Susan',
        password: 'QWERTY',
        department: 'SALES',
    }
]

// endpoints

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/login', (req, res) => {
    // verify employee's dpto is RRHH
    // verify password

    for (let index = 0; index < employees.length; index++) {
        if (employees[index].id === req.body.emp_id) {
            if (employees[index].department === 'RRHH'
                && employees[index].password === req.body.emp_pass) {
                res.sendStatus(200);
                break;
            }

            res.sendStatus(401);
            break;
        }

        // Req employee id does not exist
        if (index === employees.length - 1) res.sendStatus(400);
    }
})

app.get('/empleado/:id', (req, res) => {
    // search employee
    console.log(req.params)
    res.send({
        id: '2940',
        name: 'John',
        password: 'RZKQH2',
        department: 'RRHH',
    })
})

app.post('/empleado', (req, res) => {
    // add employee to database
    let exists = false;

    for (let index = 0; index < employees.length; index++) {
        if (employees[index].id === req.body.emp_id) {
            exists = true;
            res.sendStatus(400);
            break;
        }
    }

    if (!exists) employees.push(req.body);
    console.log(employees);
})

app.put('/empleado/:id', (req, res) => {

})

app.delete('/empleado/:id', (req, res) => {

})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})