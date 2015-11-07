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

        /**
         *
         * @type {string}
         */
        static $componentName = 'dbConnectorService';
        private config;

        constructor(){
            this.config = {
                headers:  { }
            };
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
        };

        /**
         *
         * @param resource
         * @param data
         * @param callback
         */
        public connect = function(resource, data, callback) {
            switch (resource.method) {
                case 'get':
                    resource.$resource.get(null, this.config).$promise.then(callback);
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
            if (typeof $resource.save === 'function' && typeof data === 'object') {
                $resource.save(data).$promise.then(callback);
                return true;
            }
            console.error('Invalid arguments passed at the method save in the DB donnector');
            return false;
        }
    }
}