/// <reference path="../../router.ts" />
module app.login{
    export var identifier:string = 'login';

    @app.Controller
    export class LoginController implements appComponent{

        static $inject = [
            "userService", "loginDbFactory"
        ];

        public componentName;
        private userService;
        private loginDbFactory;

        constructor(userService, loginDbFactory) {
            this.userService = userService;
            this.componentName = 'login';
            this.loginDbFactory = loginDbFactory;
        }

        /**
         *
         * @param data
         */
        submit = function(data) {
            this.userService.authenticateUser(data, this.loginDbFactory.postLogin());
        };
    }
}