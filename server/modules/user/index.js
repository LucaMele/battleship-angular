
/**
 * Created by Luca on 25.10.2015.
 */
function UserModule(db, assert){

    this.post = function(req, res) {

        console.log(req, res);

        res.format({
            'application/json': function(){
                res.send({ usercreated: true });
            }
        });
    };
}

module.exports = UserModule;