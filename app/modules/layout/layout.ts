/**
 * Created by Ricardo on 08/11/15.
 */
/// <reference path="../../router.ts" />
module app.layout{
    export var identifier:string = 'layout';


    @app.Controller
    class LayoutController implements appComponent{

        static $inject = [
            '$scope',
            '$rootScope'
        ];
        static $componentName = 'layoutController';
        public componentName;
        public actualPath;

        constructor($scope, $rootScope) {
            this.componentName = 'layoutController';
            console.log($scope, this);
            var self = this;
            $rootScope.$on('$stateChangeStart', function(event, toState) {
                console.log(toState);
                self.actualPath = toState;
            });
            self.actualPath = "";
        }

        public getClass = function(path){
            console.log(path + ' ' +this.actualPath)
            if(path===this.actualPath){
                return 'active';
            }
            return '';
        }

    }



    @app.Directive
    export class LayoutDirective implements appComponent{

        static $inject = [
            '$templateCache'
        ];
        static $componentName = 'layout';
        public componentName;
        public $templateCache;

        public replace = true;
        public scope = true;
        public restrict = 'E';
        public template = function(jqlite, attributes){
            return this.$templateCache.get(LayoutDirective.$componentName + '/templates/'+ attributes.type +'.html');
        };

        public controller;

        constructor($templateCache) {
            this.componentName = LayoutDirective.$componentName;
            this.$templateCache = $templateCache;
            return this;
            /*return {
                restrict: 'A',
                replace: true,
                require:'ngModel',
                scope: {
                    ssn: '=ngModel',
                    disabled:'=ngDisabled'
                },
                //templateUrl points to an external html template.
                templateUrl: '/myApp/templates/ssnControl.htm'
            }*/
        }



        /**
         *
         * @param data
         */

    }
}