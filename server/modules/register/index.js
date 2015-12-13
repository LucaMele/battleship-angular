/**
 * Created by Ricardo on 12.12.2015.
 */
function RegisterModule(db, assert){
    var users;
    var utility = require('../../services/utility');

    /**
     *
     * @param user
     * @returns {boolean}
     */
    var validation = function(user) {
        if (
            typeof user.password !== 'string' ||
            typeof user.username !== 'string'
        ) {
            return false;
        }

        return !(user.password.length < 3 ||
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
            res.status(418).send({ error: 'error_code_2' });
            return;
        }
        user.password = utility.md5(user.password);
        var cursor = db.collection('users').find({username: user.username}).limit(1);
        cursor.count(function(err, count) {
            assert.equal(null, err);
            if (count > 0) {
                res.status(418).send({ error: 'error_code_1' });
            } else {
                user.roles = ['user'];
                db.collection('users').insertOne( user , function(err, success) {
                    utility.executeLogin(cursor, req, res, user);
                });
            }
        });
    };

}

module.exports = RegisterModule;