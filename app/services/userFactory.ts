/**
 * Created by Luca on 25.10.2015.
 */
module app.userFactory
{
    @app.Factory
    class UserFactory
    {
        static $inject = [
            '$q', '$http', '$timeout'
        ];

        static $componentName = 'user';

        constructor($q, $http, $timeout){
            return this;
        }
        getIdentity = function() {
            return {
                id: 1,
                roles: ['guest'],
                username: 'giovanni'
            }
        }
    }
}