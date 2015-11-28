var extend = require('util')._extend;
var mongo = require('mongodb');
/**
 * Created by Luca on 25.10.2015.
 */
function GameModule(db, assert){

    var gameMap = {
        w: 15,
        h: 15,
        cell: {
            w: 40,
            h: 40
        },
        ships: []
    };

    var init = (function() {
        gameMap.ships = [
            { name: 'AQ', size: 1 },
            { name: 'Kill', size: 1 },
            { name: 'Mai', size: 1 },
            { name: 'Taylor', size: 2 },
            { name: 'Striker', size: 2 },
            { name: 'Irma', size: 2 },
            { name: 'Perkins', size: 2 },
            { name: 'Knight', size: 3 },
            { name: 'Metal', size: 3 },
            { name: 'Great Destroyer', size: 4 }
        ]
    }());

    /**
     *
     * @param req
     * @param res
     */
    this.post = function(req, res) {
        var game = req.body;
        var cursor = db.collection('games').find({status: 'IDLE', host: { $ne: game.username }}).limit(1);
        cursor.count(function(err, count) {
            assert.equal(null, err);
            if (count === 0) {
                db.collection('games').insertOne( {
                    host: game.username,
                    status: 'IDLE',
                    map_host: game.cells
                }, function() {
                    var cursor = db.collection('games').find({status: 'IDLE', host: game.username}).limit(1);
                    cursor.forEach(function(doc){
                        res.format({
                            'application/json': function(){
                                res.send({status: 'IDLE', idGame: doc._id});
                            }
                        });
                    });
                });
            } else {
                cursor.forEach(function(doc){
                    db.collection('games').updateOne({ _id: doc._id },
                        { $set:
                            {
                                map_join: game.cells,
                                status: 'READY',
                                join: game.username
                            }
                        }, function(err) {
                            assert.equal(null, err);
                            res.format({
                                'application/json': function(){
                                    res.send({
                                        status: 'READY',
                                        idGame: doc._id,
                                        join: game.username,
                                        host: doc.host,
                                        opponent: game.username === doc.host ? doc.join : doc.host
                                    });
                                }
                            });
                        }
                    );
                });
            }
        });


    };

    /**
     *
     * @param req
     * @param res
     * @param username
     */
    this.get = function(req, res, username) {
        var cursor = db.collection('games').find({$or: [ { join: username }, { host: username } ]}).limit(1);
        cursor.count(function(err, count) {
            assert.equal(null, err);
            if (count === 0) {
                res.format({
                    'application/json': function(){
                        res.send(gameMap);
                    }
                });
            } else {
                cursor.forEach(function(doc){
                    var map = extend({}, gameMap);
                    if (doc.join === username) {
                        map.cells = doc.map_join;
                    } else if(doc.host === username) {
                        map.cells = doc.map_host;
                    }
                    map.idGame = doc._id;
                    map.opponent = username === doc.host ? doc.join : doc.host;
                    map.status = doc.status;
                    res.format({
                        'application/json': function(){
                            res.send(map);
                        }
                    });
                });
            }
        });
    };

    /**
     *
     * @param req
     * @param res
     * @param username
     */
    this.getMaps = function(req, res, username) {
        var oId = new mongo.ObjectID(req.params.id);
        var cursor = db.collection('games').find({_id: oId}).limit(1);
        cursor.count(function(err, count) {
            assert.equal(null, err);
            if (count === 0) {
                res.status(418).send({ error: 'game_not_started' });
            } else {
                cursor.forEach(function(doc){
                    var map = {};
                    if (typeof doc.map_join === 'undefined' || typeof doc.map_host === 'undefined') {
                        res.status(418).send({ error: 'game_not_started' });
                        return;
                    }
                    if (doc.join === username) {
                        map.cells = doc.map_join;
                        map.cellsOpponent = doc.map_host;
                    } else if(doc.host === username) {
                        map.cells = doc.map_host;
                        map.cellsOpponent = doc.map_join;
                    }
                    map.idGame = doc._id;
                    res.format({
                        'application/json': function(){
                            res.send(map);
                        }
                    });
                });
            }
        });
    };

    /**
     *
     * @param req
     * @param res
     * @param username
     */
    this.updateGame = function(req, res, username) {
        var oId = new mongo.ObjectID(req.params.id);
        var cursor = db.collection('games').find({_id: oId}).limit(1);

        /**
         *
         * @param turn
         * @param doc
         */
        var answer = function(turn, doc) {
            res.send({
                status: 'READY',
                isTurn:turn,
                idGame: doc._id,
                join: doc.join,
                host: doc.host,
                opponent: username === doc.host ? doc.join : doc.host
            });
        };

        cursor.forEach(function(doc){
            if (doc.turn) {
                answer(doc.turn, doc);
            } else {
                var turn = (Math.floor(Math.random() * 2) + 1) === 1 ? doc.host : doc.join;
                db.collection('games').updateOne({ _id: doc._id },
                    { $set:
                    {
                        turn: turn
                    }
                    }, function(err) {
                        assert.equal(null, err);
                        res.format({
                            'application/json': function(){
                                answer(turn, doc);
                            }
                        });
                    }
                );
            }
        });
    };

    /**
     *
     * @param req
     * @param res
     * @param username
     */
    this.getGame = function (req, res, username) {
        var oId = new mongo.ObjectID(req.params.id);
        var cursor = db.collection('games').find({_id: oId}).limit(1);
        cursor.forEach(function(doc){
            res.format({
                'application/json': function(){
                    res.send({
                        status: doc.status,
                        idGame: doc._id,
                        join: doc.join,
                        host: doc.host,
                        compeeter: username === doc.host ? doc.join : doc.host
                    });
                }
            });
        });
    };
}

module.exports = GameModule;