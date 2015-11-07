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
        var cursor = db.collection('users').find(user).limit(1);
        cursor.count(function(err, count) {
            if (count === 0) {
                res.status(401).send({ error: 'unauthorized!' });
            } else {
                cursor.forEach(function(doc){
                    var auth = md5(doc._id.toString()) + ''+ md5(Date.now() + 'gdjnxhzw');
                    var date = new Date();
                    date.setDate(date.getDate() + 1);
                    db.collection('users').updateOne({ _id: doc._id },
                        { $set:
                            {
                                auth: {
                                    key: auth,
                                    expires: date.getTime()
                                }
                            }
                        }, function(err, doc) {
                            res.format({
                                'application/json': function(){
                                    res.send({ auth: auth});
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