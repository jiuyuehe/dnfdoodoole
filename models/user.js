var mongodb = require('./mongodb');
var util = require('util');


var userSchema = mongodb.Schema({
    niname: { type: String, index: true },
    email:{ type: String, index: true },
    password: String
});

 mongodb.model('User', userSchema);


