
/**
 * Created by Luca on 25.10.2015.
 */
function UsersListModule(db, assert){

    this.get = function(req, res) {
        var cursor = db.collection('users').find();
        cursor.toArray(function(err, doc){
            var usersList = [];
            var i, l;
            for (i = 0, l = doc.length; i < l; i++) {
                usersList.push({
                    name: doc[i].username,
                    id: doc[i]._id.toString(),
                    roles: doc[i].roles
                });
            }
            res.format({
                'application/json': function(){
                    res.send({ list: usersList });
                }
            });
        });

    };
}

module.exports = UsersListModule;