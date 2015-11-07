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

        static $componentName = 'dbConnectorService';

        constructor(){
            return this;
        }

        /**
         *
         * @param $resource
         * @param data
         * @param callback
         */
        save = function($resource, data, callback) {
            if (typeof $resource.save === 'function' && typeof data === 'object') {
                $resource.save(data, callback);
                return true;
            }
            console.error('Invalid arguments passed at the method save in the DB donnector');
            return false;
        }
    }
}