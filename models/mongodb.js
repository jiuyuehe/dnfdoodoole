var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
    console.log("setting.host"+settings.host);
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}), {safe: true});