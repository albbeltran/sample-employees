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
    console.log(req.body)
})

app.get('/busqueda/:id', (req, res) => {
    // search employee
    console.log(req.params)
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})