var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    config = require('../config'),
    assert = require('assert');

var db = new Db(config.db.name, new Server(config.db.host, config.db.port));

db.open(function(err, db) {
    assert.equal(null, err);
});
// Establish connection to db
module.exports = {db: db, MongoClient: MongoClient};