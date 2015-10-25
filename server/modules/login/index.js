/**
 * Created by Luca on 25.10.2015.
 */
function LoginModule(db, assert){

    var users;

    db.open(function(err, db) {
        assert.equal(null, err);
        users = db.createCollection('users');
        // Close the connection with a callback that is optional
        db.close(function(err, result) {
            assert.equal(null, err);

        });
    });

    this.post = function() {
        console.log('db', users);
    }
}

module.exports = LoginModule;