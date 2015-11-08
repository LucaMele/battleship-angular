
/**
 * Created by Luca on 25.10.2015.
 */
function HomeModule(db, assert){

    var homeMenu = [
        { 'admin': 'User administration' },
        { 'logout': 'Logout' }
    ];

    this.get = function(req, res) {
        res.format({
            'application/json': function(){
                res.send({ homeMenu: homeMenu });
            }
        });
    };
}

module.exports = HomeModule;