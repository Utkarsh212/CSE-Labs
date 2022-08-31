const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const User = require('./models/users');

const app = express();
app.use(express.json());
app.use(cookieParser());

ENV_PATH = path.join(__dirname, './config.env');
dotenv.config({path: ENV_PATH});
require('./db/connection');

const Port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "./client/build")));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.use(require('./router/auth'));

app.listen(Port, () => {
    console.log(`Server listening on: http://localhost:${Port}`);
});