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
            '$resource'
        ];

        static $componentName = 'dbConnector';

        constructor($resource){
            return this;
        }

        post = function() {
            // $resource
        }
    }
}