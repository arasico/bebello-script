var express = require('express');
var router = express.Router();

var User = require('../models/user');

// Require controller modules
var AuthController = require('../Controllers/Api/V1/AuthController');

//Route Auth
router.post('/auth/login', AuthController.postLogin);
router.post('/auth/register', AuthController.postRegister);


/* GET home page. */
router.get('/', function (req, res, next) {



    // create a user a new user
    var testUser = new User({
        email: 'jmar777',
        password: 'Password123'
    });

// save user to database
    testUser.save(function (err) {
        if (err) throw err;
    });

// fetch user and test password verification
    User.findOne({email: 'jmar777'}, function (err, user) {
        if (err) throw err;

    });

    res.send('Hello World!');
});

module.exports = router;
