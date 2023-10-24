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

// endpoints

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/login', (req, res) => {
    if (req.body.emp_id == 'john'
        && req.body.emp_pass == '123') {
        res.send('success');
    }
})

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})