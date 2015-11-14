/**
 * Created by Ricardo on 08/11/15.
 */
/// <reference path="../../router.ts" />
module app.usersList{


    export var identifier:string = 'usersList';

    class UsersListController implements appComponent{

        static $inject = [
            'dbConnectorService', 'usersListDbFactory', '$scope'
        ];
        static $componentName = 'usersListController';
        public componentName;
        public dbConnectorService;
        public usersListDbFactory;
        public data;
        public $scope;

        constructor(dbConnectorService, usersListDbFactory, $scope) {
            this.componentName = 'usersListController';
            this.data = {};
            this.$scope = $scope;
            this.dbConnectorService = dbConnectorService;
            this.usersListDbFactory = usersListDbFactory;
            this.getUsers();
        }

        /**
         *
         */
        public getUsers = function(){
            var self = this;
            this.dbConnectorService.connect(this.usersListDbFactory.getUsers(), {}, function(data) {
                self.data = data.list;
                self.$scope.$watch("newdata", function(newData) {
                    newData = JSON.parse(newData);
                    if (typeof newData.name === 'string') {
                        newData.isNew = true;
                        self.data.push(newData);
                    }
                });
            });
        };

        /**
         * 
         * @param id
         */
        public deleteUser = function(id){
            console.log('delete', id);
        }
    }

    @app.Directive
    export class UsersListDirective implements appDirective{

        static $inject = [
            '$templateCache'
        ];

        static $componentName = 'usersList';

        public componentName;
        public $templateCache;

        public replace;
        public scope;
        public restrict;

        public controller;
        public controllerAs;
        public bindToController;

        constructor($templateCache: angular.ITemplateCacheService) {
            this.componentName = UsersListDirective.$componentName;
            this.$templateCache = $templateCache;
            this.replace = true;
            this.scope = { newdata: "@newdata" };
            this.restrict = 'E';
            this.controller = UsersListController;
            this.controllerAs = 'usrListCtrl';
            return this;
        }

        template = function(jqlite, attributes){
            return this.$templateCache.get('users/templates/index.html');
        }
    }
    angular.module(identifier, []);
}