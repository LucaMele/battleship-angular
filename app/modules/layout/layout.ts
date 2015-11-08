/**
 * Created by Ricardo on 08/11/15.
 */
/// <reference path="../../router.ts" />
module app.layout{
    export var identifier:string = 'layout';


    @app.Controller
    class LayoutController implements appComponent{

        static $inject = [
            '$scope'
        ];
        static $componentName = 'layoutController';
        public componentName;

        constructor($scope) {
            this.componentName = 'layoutController';
            console.log($scope, this);

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

        //public templateUrl = '/myApp/templates/eeeeeee.htm';
        public replace = true;
        public restrict = 'E';
        public template = function(jqlite, attributes){
            console.log(attributes.ricardo)
            return this.$templateCache.get(LayoutDirective.$componentName + '/templates/header.html');
        };

        public controller;

        constructor($templateCache) {
            this.componentName = LayoutDirective.$componentName;
            this.$templateCache = $templateCache;
            this.controller = LayoutController;
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