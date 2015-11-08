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
    var accessdenied;
    (function (accessdenied) {
        accessdenied.identifier = 'accessdenied';
        var AccessdeniedController = (function () {
            function AccessdeniedController($scope) {
                this.$scope = $scope;
                this.componentName = 'accessdenied';
            }/*<auto_generate>*/AccessdeniedController.$inject = ['$scope'];AccessdeniedController.$componentName = 'AccessdeniedController'/*</auto_generate>*/
            AccessdeniedController = __decorate([
                app.Controller
            ], AccessdeniedController);
            return AccessdeniedController;
        })();
        var AccessdeniedStateController = (function () {
            function AccessdeniedStateController($scope) {
                this.$scope = $scope;
            }/*<auto_generate>*/AccessdeniedStateController.$inject = ['$scope'];AccessdeniedStateController.$componentName = 'AccessdeniedStateController'/*</auto_generate>*/
            return AccessdeniedStateController;
        })();
        accessdenied.AccessdeniedStateController = AccessdeniedStateController;
    })(accessdenied = app.accessdenied || (app.accessdenied = {}));
})(app || (app = {}));
