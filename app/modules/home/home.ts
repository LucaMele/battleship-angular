/// <reference path="../../router.ts" />
module app.home{
    export var identifier:string = 'home';

    @app.Controller
    export class HomeController implements appComponent{
        public componentName;

        static $inject = [
            "dbConnectorService", "homeDbFactory"
        ];

        private dbConnectorService;
        private homeDbFactory;

        constructor(dbConnectorService, homeDbFactory) {
            this.componentName = 'home';
            this.dbConnectorService = dbConnectorService;
            this.homeDbFactory = homeDbFactory;
        }
    }
    angular.module(identifier, []);
}