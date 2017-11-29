var UserModel = require('../../../models/user');
var crypto = require('crypto');

exports.postLogin = function (req, res) {
    res.send('NOT IMPLEMENTED: login');
};

exports.postRegister = function (req, res) {

    // User.findOne({email: req.body.email}, function (err, user) {
    //     if (err) throw err;
    //     // res.json(user);
    // });


    var secret = req.body.uuid;
    var hash = crypto.createHmac('sha256', secret)
        .update(req.body.email)
        .digest('hex');

    // create a user a new user
    var user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        updated_at: Date.now(),
        created_at: Date.now(),
        token: {
            uuid: req.body.uuid,
            token: hash,
            expire_at: Date.now(),
            type_token: req.body.agent,
            created_at: Date.now(),
            updated_at: Date.now()
        }
    });


    user.save(function (err) {
        if (err) throw err;
    });

    res.json(user);
};