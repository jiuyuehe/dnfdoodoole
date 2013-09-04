var mongoose = require('./mongodb');
var util = require('util');
var Schema = mongoose.Schema;


var date = new Date();
//存储各种时间格式，方便以后扩展
var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + "-" + (date.getMonth() + 1),
    day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
}

/**
 * 用户模型
 * @type {Schema}
 */
var userSchema = new Schema({
    niname: { type: String, index: true, trim: true},
    email: { type: String, index: true },
    password: String,
    role: { type: String, default: "com" },
    registerTime: {type: Object, default: time},
    status: {type: String, default: "ok"}
});

var User = mongoose.model('User', userSchema);

module.exports = User;


