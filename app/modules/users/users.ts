/**
 * Created by Ricardo on 08/11/15.
 */
/// <reference path="../../router.ts" />
module app.usersList{


    export var identifier:string = 'usersList';


    @app.Controller
    class UsersListController implements appComponent{

        static $inject = [
            'dbConnectorService', 'usersListDbFactory'
        ];
        static $componentName = 'usersListController';
        public componentName;
        public dbConnectorService;
        public usersListDbFactory;
        public data;

        constructor(dbConnectorService, usersListDbFactory) {
            this.componentName = 'usersListController';
            this.data = {};
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
            });
        }
    }

    @app.Directive
    export class UsersListDirective implements appComponent{

        static $inject = [
            '$templateCache'
        ];

        static $componentName = 'usersList';
        public componentName;
        public $templateCache;

        public replace = true;
        public restrict = 'E';
        public template = function(jqlite, attributes){
            return this.$templateCache.get('users/templates/index.html');
        };
        public controller;

        constructor($templateCache) {
            this.componentName = UsersListDirective.$componentName;
            this.$templateCache = $templateCache;
            this.controller = UsersListController;
            return this;
        }
    }
}