/**
 * Created by Luca on 25.10.2015.
 */
module app.GameDbFactory
{
    @app.Factory
    class GameDbFactory
    {
        static $componentName = 'gameDbFactory';

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
        public getGame = function( ){
            return {
                $resource: this.$resource('/game'),
                method: 'get'
            }
        };

        /**
         *
         * @param id
         * @returns {{$resource: any, method: string}}
         */
        public checkGame = function( id ){
            return {
                $resource: this.$resource('/game/' + id),
                method: 'get'
            }
        };

        /**
         *
         * @returns {any}
         */
        public saveReady = function( ){
            return {
                $resource: this.$resource('/game/ready'),
                method: 'post'
            }
        };
    }
}