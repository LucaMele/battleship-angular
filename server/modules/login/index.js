/**
 * Created by Luca on 25.10.2015.
 */
function LoginModule(db, assert){
    var users;
    var utility = require('../../services/utility');

    this.post = function(req, res) {
        var user = req.body;
        var cursor;
        user.password = utility.md5(user.password);
        // first access as admin admin
        cursor = db.collection('users').find();
        cursor.count(function(err, count) {
            if (count === 0 && user.password === utility.md5('admin') && user.username === 'admin') {
                db.collection('users').insertOne( {
                    username: 'admin',
                    password: user.password,
                    roles: ['admin']
                }, function(err) {
                    assert.equal(null, err);
                    utility.executeLogin(cursor, req, res, user);
                });
            } else {
                // optimise this cleanup a bit. add more security
                db.collection('users').removeOne( { username: 'admin' } );
                utility.executeLogin(cursor, req, res, user);
            }
        });
    }
}

module.exports = LoginModule;