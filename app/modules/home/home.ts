/// <reference path="../../router.ts" />
module app.home{
    export var identifier:string = 'home';

    @app.Controller
    export class HomeController implements appComponent{
        public componentName;

        static $inject = [
            'dbConnectorService', 'homeDbFactory', 'userService'
        ];
        static $componentName = 'homeController';

        private dbConnectorService;
        private homeDbFactory;
        public stats;
        public welcome;
        public username;
        public isGuest;

        /**
         *
         * @param dbConnectorService
         * @param homeDbFactory
         */
        constructor(dbConnectorService, homeDbFactory, userService) {
            this.componentName = 'home';
            this.stats = [];
            this.dbConnectorService = dbConnectorService;
            this.homeDbFactory = homeDbFactory;
            if (userService.getIdentity().username) {
                this.isGuest = false;
                this.username = userService.getIdentity().username;
                this.welcome = 'Welcome ' + this.username;
            } else {
                this.isGuest = true;
                this.username = '';
                this.welcome = 'Welcome dear guest, please register in order to be able to play'
            }

            this.getStats();
        }

        /**
         *
         */
        public getStats = function() {
            var self = this;
            this.dbConnectorService.connect(this.homeDbFactory.getStats(), {}, function(data) {
                self.stats = data.stats;
            });
        };
    }
    angular.module(identifier, []);
}