
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
        var cursor = db.collection('games').find();
        cursor.forEach(function(doc){
           console.log(doc);
            res.format({
                'application/json': function(){
                    res.send(doc);
                }
            });
        });


    };

    /**
     *
     * @param req
     * @param res
     */
    this.get = function(req, res) {
        res.format({
            'application/json': function(){
                res.send(gameMap);
            }
        });
    };
}

module.exports = GameModule;