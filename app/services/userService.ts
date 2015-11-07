/**
 * Created by Luca on 25.10.2015.
 */
module app.userService
{
    @app.Service
    class UserService
    {
        static $inject = [
            'dbConnectorService'
        ];

        static $componentName = 'userService';

        private dbConnectorService;

        constructor(dbConnectorService){
            this.dbConnectorService= dbConnectorService;
            return this;
        }

        /**
         *
         * @param data
         * @returns {boolean}
         */
        private validateAuthentication = function(data) {
            return typeof data === 'object' && typeof data.username === 'string' && typeof data.password === 'string';
        };

        /**
         *
         * @param data
         * @param $resource
         * @returns {boolean}
         */
        private proceed = function(data, $resource) {
            this.dbConnectorService.save($resource, data, function() {
                console.log(arguments);
            });
            return true;
        };

        /**
         *
         * @param data
         * @param $resource
         * @returns {boolean}
         */
        public authenticateUser = function(data, $resource) {
            if (this.validateAuthentication(data)) {
                return this.proceed(data, $resource);
            }
            return false;
        };

        public getIdentity = function() {

            return {
                id: 1,
                roles: ['guest'], // ['user']
                username: 'giovanni'
            }
        };
    }
}