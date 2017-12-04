var userModel = require('../../../models/user');
var crypto = require('crypto');

exports.postLogin = function (req, res) {


    userModel.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, user) {
        if (err) throw err;
        if (user) {
            userModel.findOne({
                "token.uuid": req.header('uuid'),
                "token.type_token": req.header('agent')
            }, function (errToken, token) {
                if (errToken) throw errToken;
                if (token) {
                    res.json(token);
                }
                else {
                }
            })
            // res.json(user);
        }
        else
            res.json({
                'status': 'error',
                'errorMessage': 'کاربر گرامی رمز عبور و پست الکترونیک شما اشتباه می باشد'
            }, 404);
    })


};

exports.postRegister = function (req, res) {
    var secret = req.header('uuid');
    var hash = crypto.createHmac('sha256', secret)
        .update(req.body.email)
        .digest('hex');
    // create a user a new user
    var user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        updated_at: Date.now(),
        created_at: Date.now(),
        token: {
            uuid: req.header('uuid'),
            token: hash,
            type_token: req.header('agent'),
            expire_at: Date.now(),
            created_at: Date.now(),
            updated_at: Date.now()
        }
    });
    user.save(function (err) {
        if (err) throw err;
    });
    res.json(user);
};

exports.test = function (req, res) {

    var data = [req.header('uuid'), req.header('agent'), req.body];

    res.json(data);
};