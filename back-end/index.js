const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors({ origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(8000);

const login = require('./login');
app.use('/login', login);

const signup = require('./signup');
app.use('/signup', signup);

const user = require('./user');
app.use('/user', user);

const auth = require('./auth');
app.use('/auth', auth);

const account = require('./account');
app.use('/account', account);