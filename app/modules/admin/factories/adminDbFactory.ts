/**
 * Created by Luca on 25.10.2015.
 */
module app.adminDbFactory
{
    @app.Factory
    class AdminDbFactory
    {
        static $componentName = 'adminDbFactory';

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
        public postNewUser = function( ){
            return {
                $resource: this.$resource('/user'),
                method: 'post'
            }
        };
    }
}