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
        private identity: Object;

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
         * @param callback
         * @returns {boolean}
         */
        private proceed = function(data, $resource, callback) {
            var self = this;
            this.dbConnectorService.save($resource.$resource, data, function(resp) {
                self.identity = angular.extend(data, {auth: resp.auth, roles: resp.roles});
                self.dbConnectorService.setHeader({
                    'Authorization': resp.auth
                });
                sessionStorage.setItem('identity', JSON.stringify(self.identity));
                callback.call(self, self.identity);
            });
            return true;
        };

        /**
         *
         * @param data
         * @param $resource
         * @param callback
         * @returns {boolean}
         */
        public authenticateUser = function(data, $resource, callback) {
            if (this.validateAuthentication(data)) {
                return this.proceed(data, $resource, callback);
            }
            return false;
        };

        /**
         *
         */
        public resetIdentity = function() {
            this.identity = {
                roles: ['guest']
            };
            var identity = sessionStorage.getItem('identity');
            if (typeof identity === 'string') {
                sessionStorage.setItem('identity', JSON.stringify(this.identity));
            }
        };

        /**
         *
         * @returns {Object|function(any=): any|{roles: string[]}|any|*}
         */
        public getIdentity = function() {
            var identity = sessionStorage.getItem('identity'),
                self = this;
            if (typeof identity === 'string') {
                identity = JSON.parse(identity);
                if (identity['auth']) {
                    self.dbConnectorService.setHeader({
                        'Authorization': identity['auth']
                    });
                }
                return identity;
            }
            if (typeof identity === 'undefined' || identity === null) {
                this.identity = {
                    roles: ['guest']
                };
            }
            return this.identity;
        };
    }
}