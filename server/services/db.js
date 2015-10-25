var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    config = require('../config');

var db = new Db(config.db.name, new Server(config.db.host, config.db.port));
// Establish connection to db
module.exports = {db: db, MongoClient: MongoClient};