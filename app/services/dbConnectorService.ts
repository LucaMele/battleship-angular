/**
 * Created by Luca on 25.10.2015.
 */
/**
 * Created by Luca on 25.10.2015.
 */
module app.dbConnectorService
{
    @app.Service
    class DbConnectorService
    {

        static $inject = [
            '$http', '$state'
        ];
        /**
         *
         * @type {string}
         */
        static $componentName = 'dbConnectorService';
        private config;
        private $http;
        private $state;

        constructor($http, $state){
            this.config = {
                headers:  { }
            };
            this.$http = $http;
            this.$state = $state;
            return this;
        }

        /**
         *
         * @param header
         */
        public setHeader = function(header){
            this.config = {
                headers:  header
            };
            this.$http.defaults.headers.common = header;
        };

        /**
         *
         */
        private success = function() {

        };

        /**
         *
         * @param response
         */
        private error = function(response) {
            if(response.status === 401 || response.status === 403) {
                this.$state.go('login');
            }
        };

        /**
         *
         * @param resource
         * @param data
         * @param callback
         */
        public connect = function(resource, data, callback) {
            var self = this;
            var error = function(resp){ self.error(resp); callback(resp); };
            var success = function(resp){ self.error(resp); };
            switch (resource.method) {
                case 'get':
                    resource.$resource.get(null, success, error).$promise.then(callback);
                    break;
                case 'post':
                    resource.$resource.save(data, success, error).$promise.then(callback);
                    break;
                case 'put':
                    resource.$resource.update(data, success, error).$promise.then(callback);
                    break;
                case 'delete':
                    resource.$resource.delete(data, success, error).$promise.then(callback);
                    break;
                default:
                    console.error('unknown method in db connector service');
                    break;
            }
        };

        /**
         *
         * @param $resource
         * @param data
         * @param callback
         */
        public save = function($resource, data, callback) {
            var self = this;
            var error = function(resp){ self.error(arguments); callback(resp); };
            var success = function(){ self.error(arguments) };
            if (typeof $resource.save === 'function' && typeof data === 'object') {
                $resource.save(data, success, error).$promise.then(callback);
                return true;
            }
            console.error('Invalid arguments passed at the method save in the DB donnector');
            return false;
        }
    }
}