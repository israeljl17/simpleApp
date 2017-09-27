'use strict';

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

let Produto = require('./models/produto');
let User = require('./models/usuario');
global.config = require('./config/config');

let produtos = require('./controllers/produtos');
let usuarios = require('./controllers/usuarios');

let app = express();
let port = process.env.PORT || 3000;

mongoose.connect(global.config.database);

let db = mongoose.connection;

db.once('open', function() {
    console.log('Connected to MongoDB');
});

db.on('error', function(err) {
    console.log(err);
});

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.set("view options", {
    layout: false
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/produtos', produtos);
app.use('/api/usuarios', usuarios);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/view/index.html'));
});

app.use(function(req, res) {
    res.status(404).send({
        erroMsg: 'Url ' + req.originalUrl + ' não encontrada.'
    });
});

app.listen(port);

console.log('App iniciado em: http://localhost:' + port);

module.exports = app;
