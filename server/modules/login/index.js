var crypto = require('crypto');

/**
 * Created by Luca on 25.10.2015.
 */
function LoginModule(db, assert){
    var users;

    var md5 = function(string) {
        var md5sum = crypto.createHash('md5');
        return  md5sum.update(string).digest("hex");
    };

    this.post = function(req, res) {
        var user = req.body;
        user.password = md5(user.password);
        var cursor = db.collection('users').find({username: user.username, password:user.password }).limit(1);
        cursor.count(function(err, count) {
            assert.equal(null, err);
            if (count === 0) {
                res.status(401).send({ error: 'unauthorized!' });
            } else {
                cursor.forEach(function(doc){
                    var auth = md5(doc._id.toString() + ''+ md5(Date.now() + 'gdjnxhzw')) + md5(Date   .now() + '12fgh');
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
    }
}

module.exports = LoginModule;