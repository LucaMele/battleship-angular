/// <reference path="../../router.ts" />
module app.register{
    export var identifier:string = 'register';

    @app.Controller
    export class RegisterController implements appComponent{

        static $inject = [
            "userService", "registerDbFactory", "authService", "toastr"
        ];

        static $componentName = 'RegisterController';

        public componentName;
        public userService;
        private registerDbFactory;
        private authService;
        public toastr;

        /**
         *
         * @param userService
         * @param registerDbFactory
         * @param authService
         * @param toastr
         */
        constructor(userService, registerDbFactory, authService, toastr) {
            this.userService = userService;
            this.componentName = 'registerController';
            this.registerDbFactory = registerDbFactory;
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
            console.log(data);
            if (!data.username || !data.password) {
                self.toastr.clear();
                self.toastr.error('Invalid register', 'Error');
                return false;
            }
            return this.userService.authenticateUser(data, this.registerDbFactory.postRegister(), function(resp) {
                if (resp && resp.error === 401) {
                    self.toastr.clear();
                    self.toastr.error('Invalid register', 'Error');
                } else {
                    self.authService.navigateTo('home');
                }
            });
        };
    }
    angular.module(identifier, []);
}