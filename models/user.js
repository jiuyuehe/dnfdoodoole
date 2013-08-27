var mongoose = require('./mongodb');
var util = require('util');
var Schema = mongoose.Schema;

/**
 * 用户模型
 * @type {Schema}
 */
var userSchema = new Schema({
    niname: { type: String, index: true, trim: true},
    email: { type: String, index: true },
    password: String,
    role: { type: String, default:"com" },
    registerTime: {type: Date, default: Date.now }

});

var User = mongoose.model('User', userSchema);

module.exports = User;


