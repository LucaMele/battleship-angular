
/**
 * Created by Luca on 25.10.2015.
 */
function HomeModule(db, assert){

    this.get = function(req, res) {
        var cursor = db.collection('stats').find();
        cursor.toArray(function(err, doc){
            var usersList = [];
            var i, l;
            for (i = 0, l = doc.length; i < l; i++) {
                usersList.push({
                    winner: doc[i].winner,
                    count: doc[i].count
                });
            }
            res.format({
                'application/json': function(){
                    res.send({ stats: usersList });
                }
            });
        });
    };
}

module.exports = HomeModule;