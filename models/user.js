var mongoose = require('./mongodb');
var util = require('util');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    niname: { type: String, index: true },
    email:{ type: String, index: true },
    password: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;


