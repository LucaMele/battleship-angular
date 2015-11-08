var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/// <reference path="../../router.ts" />
var app;
(function (app) {
    var login;
    (function (login) {
        login.identifier = 'login';
        var LoginController = (function () {
            function LoginController(userService, loginDbFactory, authService) {
                /**
                 *
                 * @param data
                 */
                this.submit = function (data) {
                    var self = this;
                    this.userService.authenticateUser(data, this.loginDbFactory.postLogin(), function () {
                        self.authService.navigateTo('site.home');
                    });
                };
                this.userService = userService;
                this.componentName = 'login';
                this.loginDbFactory = loginDbFactory;
                this.authService = authService;
                this.userService.resetIdentity();
            }/*<auto_generate>*/LoginController.$inject = ['userService','loginDbFactory','authService'];LoginController.$componentName = 'LoginController'/*</auto_generate>*/
            LoginController.$inject = [
                "userService", "loginDbFactory", "authService"
            ];
            LoginController = __decorate([
                app.Controller
            ], LoginController);
            return LoginController;
        })();
        login.LoginController = LoginController;
    })(login = app.login || (app.login = {}));
})(app || (app = {}));
