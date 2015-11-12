/**
 * Created by Ricardo on 08/11/15.
 */
/// <reference path="../../router.ts" />
module app.layout{
    export var identifier:string = 'layout';

    class LayoutController implements appComponent{

        static $inject = [
            '$scope',
            '$rootScope',
            'userService'
        ];
        static $componentName = 'layoutController';
        public componentName;
        public isAdmin;
        public isUser;

        constructor($scope, $rootScope, userService) {
            this.componentName = 'layoutController';
            this.isAdmin = !! ~ userService.getIdentity().roles.indexOf("admin");
            this.isUser = !! ~ userService.getIdentity().roles.indexOf("user");
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

        public controller = LayoutController;
        public controllerAs = "layoutCtrl";

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