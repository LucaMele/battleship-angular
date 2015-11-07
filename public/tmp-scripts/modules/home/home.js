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
            function HomeController(dbConnectorService, homeDbFactory) {
                this.componentName = 'home';
                this.dbConnectorService = dbConnectorService;
                this.homeDbFactory = homeDbFactory;
                // test
                var self = this;
                dbConnectorService.connect(this.homeDbFactory.getHome(), {}, function () {
                });
            }/*<auto_generate>*/HomeController.$inject = ['dbConnectorService','homeDbFactory'];HomeController.$componentName = 'HomeController'/*</auto_generate>*/
            HomeController.$inject = [
                "dbConnectorService", "homeDbFactory"
            ];
            HomeController = __decorate([
                app.Controller
            ], HomeController);
            return HomeController;
        })();
        home.HomeController = HomeController;
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
