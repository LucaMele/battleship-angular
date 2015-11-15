
/**
 * Created by Luca on 25.10.2015.
 */
function GameModule(db, assert){

    var gameMap = {
        w: 15,
        h: 15,
        cell: {
            w: 35,
            h: 35
        }
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