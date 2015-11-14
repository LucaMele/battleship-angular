
/**
 * Created by Luca on 25.10.2015.
 */
function UserModule(db, assert){

    /**
     *
     */
    var utility = require('../../services/utility');

    /**
     *
     * @param user
     * @returns {boolean}
     */
    var validation = function(user) {
        if (
            typeof user.password !== 'string' ||
            typeof user.role !== 'string' ||
            typeof user.username !== 'string'
        ) {
            return false;
        }

        return !(user.password.length < 3 ||
        user.role.length < 3 ||
        user.username.length < 3);
    };

    /**
     *
     * @param req
     * @param res
     */
    this.post = function(req, res) {
        var user = req.body;
        if(!validation(user)) {
            res.status(418).send({ error: 'form validation falied' });
            return;
        }
        var cursor = db.collection('users').find({username: user.username}).limit(1);
        cursor.count(function(err, count) {
            assert.equal(null, err);
            if (count > 0) {
                res.status(418).send({ error: 'User already registered' });
            } else {
                user.password = utility.md5(user.password);
                user.roles = [user.role];
                delete user.role;
                db.collection('users').insertOne( user , function() {
                    res.format({
                        'application/json': function(){
                            res.send({ usercreated: true });
                        }
                    });
                })
            }
        });
    };
}

module.exports = UserModule;