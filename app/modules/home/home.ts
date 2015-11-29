/// <reference path="../../router.ts" />
module app.home{
    export var identifier:string = 'home';

    @app.Controller
    export class HomeController implements appComponent{
        public componentName;

        static $inject = [
            "dbConnectorService", "homeDbFactory"
        ];
        static $componentName = 'homeController';

        private dbConnectorService;
        private homeDbFactory;
        public stats;

        constructor(dbConnectorService, homeDbFactory) {
            this.componentName = 'home';
            this.stats = [];
            this.dbConnectorService = dbConnectorService;
            this.homeDbFactory = homeDbFactory;
            this.getStats();
        }

        getStats = function() {
            var self = this;
            this.dbConnectorService.connect(this.homeDbFactory.getStats(), {}, function(data) {
                self.stats = data.stats;
            });
        };
    }
    angular.module(identifier, []);
}