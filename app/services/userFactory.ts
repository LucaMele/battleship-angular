/**
 * Created by Luca on 25.10.2015.
 */
module app.userFactory
{
    @app.Factory
    class UserFactory
    {
        static $inject = [
            '$q', '$timeout', 'dbConnector'
        ];

        static $componentName = 'user';

        private $resource;

        constructor($q, $timeout, dbConnector){
            console.log(dbConnector);
            return this;
        }

        getIdentity = function() {
            return {
                id: 1,
                roles: ['guest'], // ['user']
                username: 'giovanni'
            }
        }
    }
}