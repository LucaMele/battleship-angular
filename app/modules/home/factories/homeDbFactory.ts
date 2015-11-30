/**
 * Created by Luca on 25.10.2015.
 */
module app.homeDbFactory
{
    @app.Factory
    class HomeDbFactory
    {
        static $componentName = 'homeDbFactory';

        static $inject = [
            "$resource"
        ];

        private $resource;

        /**
         *
         * @param $resource
         * @returns {app.homeDbFactory.HomeDbFactory}
         */
        constructor($resource){
            this.$resource = $resource;
            return this;
        }

        /**
         *
         * @returns {any}
         */
        public getStats = function( ){
            return {
                $resource: this.$resource('/home'),
                method: 'get'
            }
        };
    }
}