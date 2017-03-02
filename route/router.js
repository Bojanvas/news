var express = require('express');
var body = require('body-parser');
var session = require('express-session');
var path = require('path');
var request = require('request');
var router = express.Router();
var User = require('./user.js');
var api = '38b324008159485dbac8f81842d61244';

var url = 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=' + api;
var url2 = "https://newsapi.org/v1/articles?source=the-sport-bible&sortBy=top&apiKey=" + api;
var url3 = 'https://newsapi.org/v1/articles?source=t3n&sortBy=top&apiKey=' + api;
var url4 = ' https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=' + api;

var ses;

router.get('/', function(req, res) {
    ses = req.session;
    console.log(ses);

    request({
        url: url,
        url2: url2,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render(__dirname + '/../views/pages/home', {
                data: body.articles,
                session: ses.user

            })

        }
    });

})

var logout = function(ses) {
    if (ses) {
        return log = 'Logout';
    } else console.log("Login");
}
router.get('/tehno', function(req, res) {
    ses = req.session;
    request({
        url: url3,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render(__dirname + '/../views/pages/tehno', {
                data: body.articles,
                session: ses.user
            })
        }
    })
})
router.get('/sport', function(req, res) {
    ses = req.session;
    request({
        url: url2,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render(__dirname + '/../views/pages/sport', {
                data: body.articles,
                session: ses.user
            })
        }
    });

})
router.get('/earth', function(req, res) {
    ses = req.session;
    request({
        url: url4,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.render(__dirname + "/../views/pages/earth", {
                data: body.articles,
                session: ses.user,
                id: ses.id
            })
        }
    })
})
router.get('/regis', function(req, res) {
    res.render(__dirname + "/../views/pages/register");
})
router.get('/login', function(req, res) {
    res.render(__dirname + "/../views/pages/login");
})

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
})
router.post('/req', function(req, res) {
    var body = req.body;

    User.findOne({ name: body.name }, function(err, user) {
        console.log(user)
        if (user) {
            res.render(__dirname + "/../views/pages/register", {
                message: "Username already exist"
            });
        } else {
            user = new User;
            user.name = body.name;
            user.password = body.password;
            user.email = body.email;
            user.save();
            res.redirect('/');
        }
    })

})

function validate(body) {
    User.findOne({ name: body.name }, function(err, user) {
        console.log(user)
        if (user) {
            return true;
        } else return false;
    })
}


router.post('/log', function(req, res) {
    var person = req.body;
    if (!person.name || !person.password) {
        res.send('pls enter user name and password');
    } else {
        User.findOne({ name: person.name }, function(err, user) {
            if (user) {
                if (user.name == person.name && user.password == person.password) {
                    req.session.user = user.name;
                    req.session.id = user._id;
                    res.redirect('/');
                } else {
                    res.render(__dirname + "/../views/pages/login", {
                        message: 'wrong password'
                    });
                }
            } else {
                res.render(__dirname + "/../views/pages/login", {
                    message: 'wrong user name and password'
                });
            }
        })
    }
})
router.get('/user:id', function(req, res) {
    ses = req.session;
    var id = req.params.id;
    User.findOne({ name: id }, function(err, users) {
        console.log(users);
        res.render(__dirname + '/../views/pages/profile', {
            session: ses.user,
            user: users
        })
    })

})
module.exports = router;