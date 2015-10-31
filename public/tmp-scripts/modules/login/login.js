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
            function LoginController($scope) {
                this.$scope = $scope;
                this.submit = function () {
                    console.log(arguments);
                };
                this.componentName = 'login';
            }/*<auto_generate>*/LoginController.$inject = ['$scope'];LoginController.$componentName = 'LoginController'/*</auto_generate>*/
            LoginController = __decorate([
                app.Controller
            ], LoginController);
            return LoginController;
        })();
        var LoginStateController = (function () {
            function LoginStateController($scope) {
                this.$scope = $scope;
                $scope['date'] = new Date();
            }/*<auto_generate>*/LoginStateController.$inject = ['$scope'];LoginStateController.$componentName = 'LoginStateController'/*</auto_generate>*/
            return LoginStateController;
        })();
        login.LoginStateController = LoginStateController;
    })(login = app.login || (app.login = {}));
})(app || (app = {}));
