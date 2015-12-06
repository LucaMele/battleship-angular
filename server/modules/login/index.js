/**
 * Created by Luca on 25.10.2015.
 */
function LoginModule(db, assert){
    var users;
    var utility = require('../../services/utility');

    /**
     *
     * @param cursor
     * @param req
     * @param res
     * @param user
     */
    var executeLogin = function(cursor, req, res, user) {
        cursor = db.collection('users').find({username: user.username, password:user.password }).limit(1);
        cursor.count(function(err, count) {
            assert.equal(null, err);
            if (count === 0) {
                res.status(401).send({ error: 'unauthorized' });
            } else {
                cursor.forEach(function(doc){
                    var auth = utility.md5(doc._id.toString() + ''+ utility.md5(Date.now() + 'gdjnxhzw')) + utility.md5(Date   .now() + '12fgh');
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    db.collection('users').updateOne({ _id: doc._id },
                        { $set:
                        {
                            key: auth,
                            key_expires: date.getTime()
                        }
                        }, function(err) {
                            assert.equal(null, err);
                            res.format({
                                'application/json': function(){
                                    res.send({ auth: auth, roles: doc.roles });
                                }
                            });
                        }
                    );
                });
            }
        });
    };

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
                    executeLogin(cursor, req, res, user);
                });
            } else {
                // optimise this cleanup a bit. add more security
                db.collection('users').removeOne( { username: 'admin' } );
                executeLogin(cursor, req, res, user);
            }
        });


    }
}

module.exports = LoginModule;