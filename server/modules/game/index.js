
/**
 * Created by Luca on 25.10.2015.
 */
function GameModule(db, assert){

    var gameMenu = [
        { 'game': 'start the game' },
        { 'logout': 'Logout' }
    ];

    this.get = function(req, res) {
        res.format({
            'application/json': function(){
                res.send({ gameMenu: gameMenu });
            }
        });
    };
}

module.exports = GameModule;