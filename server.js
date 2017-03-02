var express = require('express');
var hbs = require('express-handlebars').create({ defaultLayout: 'index' });
var body = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session')
var app = express();

var router = require('./route/router');
var port = process.env.PORT || 3000;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(body.json());
app.use(body.urlencoded({ extended: true }))
app.use('/assets', express.static(__dirname + "/public"));
app.use(session({
    secret: 'mane is king',
    resave: true,
    saveUninitialized: true
}))
app.use('/', router);

app.listen(port, function() {
    console.log('conected');
})