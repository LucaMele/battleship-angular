/// <reference path="../../router.ts" />
module app.login{
    export var identifier:string = 'login';

    @app.Controller
    export class LoginController implements appComponent{

        static $inject = [
            "userService", "loginDbFactory", "authService", "toastr"
        ];

        static $componentName = 'LoginController';

        public componentName;
        public userService;
        private loginDbFactory;
        private authService;
        public toastr;

        /**
         *
         * @param userService
         * @param loginDbFactory
         * @param authService
         * @param toastr
         */
        constructor(userService, loginDbFactory, authService, toastr) {
            this.userService = userService;
            this.componentName = 'loginController';
            this.loginDbFactory = loginDbFactory;
            this.authService = authService;
            this.toastr = toastr;
            this.userService.resetIdentity();
        }

        /**
         *
         * @param data
         */
        public submit = function(data) {
            var self = this;
            if (!data.username || !data.password) {
                self.toastr.clear();
                self.toastr.error('Invalid login', 'Error');
                return false;
            }
            return this.userService.authenticateUser(data, this.loginDbFactory.postLogin(), function(resp) {
                if (resp && resp.error === 401) {
                    self.toastr.clear();
                    self.toastr.error('Invalid login', 'Error');
                } else {
                    self.authService.navigateTo('home');
                }
            });
        };
    }
    angular.module(identifier, []);
}