// models/user.js
// load the things we need
var mongoose = require('mongoose')

// define the schema for our user model
var usersSchema = mongoose.Schema({
    name: String,
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    updated_at: Number,
    created_at: Number,
    token: {
        uuid: String,
        token: String,
        expire_at: Number,
        type: String,
        created_at: Number,
        updated_at: Number
    }
})

// create the model for users and expose it to our app
module.exports = mongoose.model('users', usersSchema)