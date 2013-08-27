var mongoose = require('mongoose')
settings = require('../settings');

var url = "mongodb://" + settings.host + "/" + settings.db;

mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    // yay!
    console.log("db is connected")
});

module.exports = mongoose;



