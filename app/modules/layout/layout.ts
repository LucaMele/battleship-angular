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
    export class LayoutDirective implements appDirective{

        static $inject = [
            '$templateCache'
        ];
        static $componentName = 'layout';
        public componentName;
        public $templateCache;

        public replace = true;
        public scope;
        public restrict;

        public controller;
        public controllerAs;

        constructor($templateCache) {
            this.componentName = LayoutDirective.$componentName;
            this.$templateCache = $templateCache;
            this.replace = true;
            this.scope = {};
            this.restrict = 'E';
            this.controller = LayoutController;
            this.controllerAs = "layoutCtrl";
            return this;
        }

        /**
         *
         * @param jqlite
         * @param attributes
         * @returns {any}
         */
        template = function(jqlite, attributes) {
            return this.$templateCache.get(LayoutDirective.$componentName + '/templates/'+ attributes.type +'.html');
        };
    }

    angular.module(identifier, []);
}