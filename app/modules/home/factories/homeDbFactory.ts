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

        constructor($resource){
            this.$resource = $resource;
            return this;
        }

        /**
         *
         * @returns {any}
         */
        public getHome = function( ){
            return {
                $resource: this.$resource('/home'),
                method: 'get'
            }
        };
    }
}