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
         * @returns {any}
         */
        public getMaps = function( idGame ){
            return {
                $resource: this.$resource('/maps/' + idGame),
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
         * @param id
         * @returns {{$resource: any, method: string}}
         */
        public deleteGame =function( id ){
            return {
                $resource: this.$resource('/game/' + id),
                method: 'delete'
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

        /**
         *
         * @param id
         * @returns {{$resource: any, method: string}}
         */
        public setTurn = function(id){
            return {
                $resource: this.$resource('/game/' + id, { id: '@id' }, {
                    update: {
                        method: 'PUT'
                    }
                }),
                method: 'put'
            }
        };

        /**
         *
         * @param id
         * @returns {{$resource: any, method: string}}
         */
        public saveMark = function(){
            return {
                $resource: this.$resource('/map/mark'),
                method: 'post'
            }
        };
    }
}