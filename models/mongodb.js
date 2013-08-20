//var settings = require('../settings'),
    //Db = require('mongodb').Db,
   // Connection = require('mongodb').Connection,
    //Server = require('mongodb').Server;


   // console.log("setting.host"+settings.host);




//module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}), {safe: true});

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format
    , settings = require('../settings');

var url = "mongodb://"+settings.host+"/"+settings.db;

//connect away
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");

    //create collection
    db.createCollection("testCollection", function(err, collection){
        if (err) throw err;

        console.log("Created testCollection");
        console.log(collection);
    });
});