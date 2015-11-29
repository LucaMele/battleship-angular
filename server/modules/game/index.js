var extend = require('util')._extend;
var mongo = require('mongodb');
/**
 * Created by Luca on 25.10.2015.
 */
function GameModule(db, assert){

    var gameMap = {
        w: 12,
        h: 12,
        cell: {
            w: 40,
            h: 40
        },
        ships: []
    };

    var init = (function() {
        gameMap.ships = [
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
     * @param map
     * @returns {{map: *, totShips: number}}
     */
    var clenaupMapsFromShips = function(map) {
        var i, l, totShips = 0;
        for (i = 0, l = map.length; i < l; i++){
            if (map[i].cellName === 'ship') {
                // same as frontend. keep attention when changing them
                map[i].cellName = 'water';
                map[i].cellClassName = 'water-cell';
                totShips ++;
            }
        }
        return {map: map, totShips: totShips};
    };

    /**
     *
     * @param map
     * @returns {boolean}
     */
    var checkMapForWinner = function (map) {
        var i, l, totShips = 0;
        for (i = 0, l = map.length; i < l; i++){
            if (map[i].cellName === 'ship') {
                return false;
            }
        }
        return true;
    };

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
                    var map = {}, obj, winner;
                    if (typeof doc.map_join === 'undefined' || typeof doc.map_host === 'undefined') {
                        res.status(418).send({ error: 'game_not_started' });
                        return;
                    }
                    if (doc.join === username) {
                        map.cells = doc.map_join;
                        obj = clenaupMapsFromShips(doc.map_host);
                        map.cellsOpponent = obj.map;
                        if (obj.totShips > 0) {
                            winner = checkMapForWinner(doc.map_join);
                            map.isWinner = doc.host;
                        } else {
                            map.isWinner = username;
                        }
                    } else if(doc.host === username) {
                        map.cells = doc.map_host;
                        obj = clenaupMapsFromShips(doc.map_join);
                        map.cellsOpponent = obj.map;
                        if (obj.totShips > 0) {
                            winner = checkMapForWinner(doc.map_host);
                            map.isWinner = doc.join;
                        } else {
                            map.isWinner = username;
                        }
                    }
                    map.idGame = doc._id;
                    map.turn = doc.turn;
                    if (!obj.totShips || winner) {
                        db.collection('games').updateOne({ _id: doc._id },
                            { $set:
                            {
                                isWinner: map.isWinner
                            }
                            }, function(err) {

                                res.format({
                                    'application/json': function(){
                                        res.send(map);
                                    }
                                });
                            }
                        );
                    } else {
                        map.isWinner = '';
                        res.format({
                            'application/json': function(){
                                res.send(map);
                            }
                        });
                    }
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
                        opponent: username === doc.host ? doc.join : doc.host
                    });
                }
            });
        });
    };

    /**
     *
     * @param req
     * @param res
     * @param username
     */
    this.setMark = function(req, res, username) {
        var oId = new mongo.ObjectID(req.body.id);
        var marker = req.body;
        var cursor = db.collection('games').find({_id: oId, turn: username}).limit(1);
        cursor.count(function(err, count) {
            assert.equal(null, err);
            if (count === 0) {
                res.status(418).send({ error: 'invalid_set_marker' });
            } else {
                cursor.forEach(function(doc){
                    var mapToUpdate;
                    if (!marker || typeof marker.index === 'undefined' || !marker.cell) {
                        res.status(418).send({ error: 'invalid_set_marker' });
                        return;
                    }

                    /**
                     *
                     * @param mapToUpdate
                     * @param cell
                     * @param index
                     * @returns {*}
                     */
                    var checkCell = function(mapToUpdate, cell, index) {
                        // todo -> check integrity of cell

                        if (mapToUpdate[index].cellName === 'ship') {
                            // same as frontend. Keep attention
                            cell.cellName = 'ship-marked';
                            // same as frontend, keep attention
                            cell.cellClassName = 'ship-marked-cell' +
                                (mapToUpdate[index].isHorizontal ? ' horizontal ' : ' vertical ') + (mapToUpdate[index].size > 1 ? (mapToUpdate[index].pos) : ' single');
                            mapToUpdate[index] = extend(mapToUpdate[index], cell);
                        } else {
                            // same as frontend. Keep attention
                            cell.cellName = 'water-marked';
                            cell.cellClassName = 'water-marked-cell';
                            mapToUpdate[index] = cell;
                        }
                        return mapToUpdate;
                    };

                    /**
                     *
                     * @param turn
                     * @param mapToUpdate
                     * @param cellName
                     * @param index
                     * @param whichMap
                     */
                    var updateMap = function(turn, mapToUpdate, cellName, index, whichMap) {
                        var setObj = {};
                        setObj[whichMap] = mapToUpdate;
                        setObj.turn = turn;
                        db.collection('games').updateOne({ _id: doc._id },
                            { $set: setObj }, function() {
                                assert.equal(null, err);
                                res.format({
                                    'application/json': function(){
                                        res.send({
                                            cell: mapToUpdate[index],
                                            index: index
                                        });
                                    }
                                });
                            });
                    };

                    // handle maps
                    if (username === doc.host) {
                        mapToUpdate = doc.map_join;
                        mapToUpdate = checkCell(mapToUpdate, marker.cell, marker.index);
                        updateMap(doc.join, mapToUpdate, mapToUpdate[marker.index].cellName, marker.index, 'map_join');
                    } else {
                        mapToUpdate = doc.map_host;
                        mapToUpdate = checkCell(mapToUpdate, marker.cell, marker.index);
                        updateMap(doc.host, mapToUpdate, mapToUpdate[marker.index].cellName, marker.index, 'map_host');
                    }
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
    this.deleteGame = function(req, res, username) {
        var oId = new mongo.ObjectID(req.params.id);
        db.collection('games').removeOne( { _id: oId, $or: [ { host: username }, { join: username }] } , function(err, doc) {
            if (err !== null) {
                res.status(418).send({ error: 'no_permission_to_delete' });
                return;
            }
            res.format({
                'application/json': function(){
                    res.send({ deleted: true });
                }
            });
        });
    };
}

module.exports = GameModule;