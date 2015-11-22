
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
                    res.format({
                        'application/json': function(){
                            res.send({status: 'IDLE'});
                        }
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
                                    res.send({status: 'READY', idGame: doc._id, join: game.username, host: doc.host});
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
                    if (doc.join === username) {
                        gameMap.cells = doc.map_join;
                    } else {
                        gameMap.cells = doc.map_host;
                    }
                    gameMap.gameId = doc._id;
                    res.format({
                        'application/json': function(){
                            res.send(gameMap);
                        }
                    });
                });
            }
        });
    };
}

module.exports = GameModule;