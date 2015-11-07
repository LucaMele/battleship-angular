/**
 * Created by Luca on 25.10.2015.
 */
module app.loginDbFactory
{
    @app.Factory
    class LoginDbFactory
    {
        static $componentName = 'loginDbFactory';

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
        postLogin = function( ){
            return this.$resource('/login');
        };
    }
}