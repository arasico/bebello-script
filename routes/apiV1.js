var express = require('express');
var router = express.Router();

var User = require('../models/user');

// Require controller modules
var AuthController = require('../Controllers/Api/V1/AuthController');

//Route Auth
router.post('/auth/login', AuthController.postLogin);
router.post('/auth/register', AuthController.postRegister);


module.exports = router;
