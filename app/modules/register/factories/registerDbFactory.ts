/**
 * Created by Ricardo on 15.12.2015.
 */
module app.registerDbFactory
{
    @app.Factory
    class registerDbFactory
    {
        static $componentName = 'registerDbFactory';

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
        public postRegister = function( ){
            return {
                $resource: this.$resource('/register'),
                method: 'post'
            }
        };
    }
}