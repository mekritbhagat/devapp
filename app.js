const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, Context-Type, X-Requested-With, Accept");
    next();
});

const config = require('./config.js');
const mongoose = require('mongoose');
const mongojs = require('mongojs');

require('./');
mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database.");
}).catch(err => {
    console.log('Could not connect to the database. Exit with terminating...');
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message" : "Welcome to Invoice System."});
});

app.listen(config.port, () => {
    console.log("Server is listening on port "+port);
});