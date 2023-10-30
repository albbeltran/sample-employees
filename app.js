const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const router = require('./router');

dotenv.config();

const port = process.env.PORT;

// middleware

app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

app.use(express.static('public'));
// view engine
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cookieParser());

// cors
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}));

// router
app.use('/', router);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})