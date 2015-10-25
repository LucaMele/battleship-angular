var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var db = new Db('battleship-angular', new Server('localhost', 27017));
// Establish connection to db
module.exports = {db: db, MongoClient: MongoClient};