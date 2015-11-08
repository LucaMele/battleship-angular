/**
 * Created by Luca on 25.10.2015.
 */
module app.usersListDbFactory
{
    @app.Factory
    class UsersListDbFactory
    {
        static $componentName = 'usersListDbFactory';

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
        public getUsers = function( ){
            return {
                $resource: this.$resource('/users/list'),
                method: 'get'
            }
        };
    }
}