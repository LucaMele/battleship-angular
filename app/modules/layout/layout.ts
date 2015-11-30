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
        public isGuest;
        public username;

        /**
         *
         * @param $scope
         * @param $rootScope
         * @param userService
         */
        constructor($scope, $rootScope, userService) {
            var self = this;
            this.componentName = 'layoutController';
            this.isAdmin = !! ~ userService.getIdentity().roles.indexOf("admin");
            this.isUser = !! ~ userService.getIdentity().roles.indexOf("user");
            this.isGuest = !! ~ userService.getIdentity().roles.indexOf("guest");
            this.username = userService.getIdentity().username;
            $scope.$on('$stateChangeSuccess', function() {
                var roles = userService.getIdentity().roles;
                self.isAdmin = !! ~ roles.indexOf("admin");
                self.isUser = !! ~ roles.indexOf("user");
                self.isGuest = !! ~ roles.indexOf("guest");
                self.username = userService.getIdentity().username;
            });
        }

        /**
         *
         * @param roles
         * @returns {boolean}
         */
        isToShowAs = function(roles) {
            var isVisible = false;
            if (this.isAdmin && !! ~ roles.indexOf('admin')) {
                return true;
            }
            if (this.isUser && !! ~ roles.indexOf('user')) {
                isVisible = true;
            }
            if (this.isGuest && !! ~ roles.indexOf('guest')) {
                isVisible = true;
            }
            return isVisible;
        };
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

        /**
         *
         * @param $templateCache
         * @returns {app.layout.LayoutDirective}
         */
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
        public template = function(jqlite, attributes) {
            return this.$templateCache.get(LayoutDirective.$componentName + '/templates/'+ attributes.type +'.html');
        };
    }

    angular.module(identifier, []);
}