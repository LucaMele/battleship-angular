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
    var home;
    (function (home) {
        home.identifier = 'home';
        var HomeController = (function () {
            function HomeController($scope) {
                this.$scope = $scope;
                this.componentName = 'home';
            }/*<auto_generate>*/HomeController.$inject = ['$scope'];HomeController.$componentName = 'HomeController'/*</auto_generate>*/
            HomeController = __decorate([
                app.Controller
            ], HomeController);
            return HomeController;
        })();
        var HomeStateController = (function () {
            function HomeStateController($scope) {
                this.$scope = $scope;
                $scope['test'] = 'i come from the angular controller!!';
            }/*<auto_generate>*/HomeStateController.$inject = ['$scope'];HomeStateController.$componentName = 'HomeStateController'/*</auto_generate>*/
            return HomeStateController;
        })();
        home.HomeStateController = HomeStateController;
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
