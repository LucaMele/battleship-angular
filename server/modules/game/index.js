
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
        ships: [
            {name: 'destroyer', size: 2},
            {name: 'mian', size: 3},
            {name: 'scoll', size: 2},
            {name: 'ddfv', size: 1}
        ]
    };

    this.get = function(req, res) {
        res.format({
            'application/json': function(){
                res.send(gameMap);
            }
        });
    };
}

module.exports = GameModule;