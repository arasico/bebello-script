var userModel = require('../../../models/user');
var crypto = require('crypto');

exports.postLogin = function (req, res) {


    var user = userModel.findOne({email: req.body.email}, function (err, user) {
        console.log(user);

        // res.json(user);
        // Project.findOne({name: project, user: user._id}, function(err, project){
        //     if(err) {
        //         console.log(err);
        //         return
        //     }
        //
        //     Issues.find({project_id: project._id}, function(err, issues){
        //         if(err) {
        //             console.log(err);
        //             return
        //         }
        //
        //         res.render('./views/issues/index', {user: user, project: poject, issues: issues});
        //     })
        // });
    });

    res.json(req.params.email);

    // UserModel   .findOne({_id: "5a1e5099de6d162b64074c72"}, function(err, document) {
    // });

    // UserModel.findOne({'email': 'info'}, function (err, usr) {
    //     if (err) throw err;
    //     res.json(usr);
    // })


    res.send('NOT IMPLEMENTED: login');

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
            expire_at: Date.now(),
            type_token: req.header('agent'),
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