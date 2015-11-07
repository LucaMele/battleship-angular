var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var app;
(function (app) {
    var bootstrap;
    (function (bootstrap) {
        var AppBootstrap = (function () {
            function AppBootstrap($rootScope, $state, $stateParams, authService, userService) {
                $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                    $rootScope.toState = toState;
                    $rootScope.toStateParams = toStateParams;
                    if (authService.canAccess(userService.getIdentity(), toState)) {
                        authService.authorize(userService, toState);
                    }
                    else {
                        event.preventDefault();
                        authService.isUnathorized();
                    }
                });
            }
            AppBootstrap.$inject = [
                '$rootScope',
                '$state',
                '$stateParams',
                'authService',
                'userService'
            ];
            AppBootstrap = __decorate([
                app.Run
            ], AppBootstrap);
            return AppBootstrap;
        })();
    })(bootstrap = app.bootstrap || (app.bootstrap = {}));
})(app || (app = {}));
