var express = require('express');
var body = require('body-parser');
var session = require('express-session');
var path = require('path');
var request = require('request');
var router = express.Router();

var api = '38b324008159485dbac8f81842d61244';

var url = 'https://newsapi.org/v1/articles?source=techcrunch&apiKey=' + api;


router.get('/', function(req, res) {
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render(__dirname + '/../views/pages/home', {
                data: body.articles
            })
        }
    });

})
router.get('/data', function(req, res) {
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body.articles)
        }
    });

})

module.exports = router;