/// <reference path="../../router.ts" />
module app.login{
    export var identifier:string = 'login';

    @app.Controller
    export class LoginController implements appComponent{

        static $inject = [
            "userService", "loginDbFactory", "authService"
        ];

        public componentName;
        private userService;
        private loginDbFactory;
        private authService;

        constructor(userService, loginDbFactory, authService) {
            this.userService = userService;
            this.componentName = 'login';
            this.loginDbFactory = loginDbFactory;
            this.authService = authService;
            this.userService.resetIdentity();
        }

        /**
         *
         * @param data
         */
        public submit = function(data) {
            var self = this;
            this.userService.authenticateUser(data, this.loginDbFactory.postLogin(), function() {
                self.authService.navigateTo('site.home');
            });
        };
    }
    angular.module(identifier, []);
}