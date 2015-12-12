/// <reference path="../../router.ts" />
module app.register{
    export var identifier:string = 'register';

    @app.Controller
    export class RegisterController implements appComponent{

        static $inject = [
            "userService", "registerDbFactory", "authService", "toastr", 'errorFactory'
        ];

        static $componentName = 'RegisterController';

        public componentName;
        public userService;
        private registerDbFactory;
        private errorFactory;
        private authService;
        public toastr;

        /**
         *
         * @param userService
         * @param registerDbFactory
         * @param authService
         * @param toastr
         */
        constructor(userService, registerDbFactory, authService, toastr, errorFactory) {
            this.userService = userService;
            this.errorFactory = errorFactory;
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
            if (!data.username || !data.password) {
                self.toastr.clear();
                self.toastr.error('Invalid register', 'Error');
                return false;
            }
            return this.userService.authenticateUser(data, this.registerDbFactory.postRegister(), function(status, resp) {
                if(resp && resp.data && self.errorFactory.getError(resp.data.error)){
                    self.toastr.clear();
                    self.toastr.warning(self.errorFactory.getError(resp.data.error),' Warning');
                } else {
                    // if no error, proceed

                    self.authService.navigateTo('home');
                }

            });
        };
    }
    angular.module(identifier, []);
}