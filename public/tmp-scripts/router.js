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
    var appRouter;
    (function (appRouter) {
        var AppRouterConfig = (function () {
            function AppRouterConfig($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('site', {
                    'abstract': true
                })
                    .state('site.' + app.login.identifier, {
                    url: '/login',
                    data: {
                        roles: []
                    },
                    views: {
                        "content@": {
                            templateProvider: function ($templateCache) {
                                return $templateCache.get(app.login.identifier + '/templates/index.html');
                            },
                            controller: app.login.LoginController
                        }
                    }
                })
                    .state('site.' + app.home.identifier, {
                    url: '/home',
                    data: {
                        roles: ['user']
                    },
                    views: {
                        "content@": {
                            templateProvider: function ($templateCache) {
                                return $templateCache.get(app.home.identifier + '/templates/index.html');
                            },
                            controller: app.home.HomeStateController
                        }
                    }
                });
                $urlRouterProvider.otherwise('/home');
            }
            AppRouterConfig.$inject = [
                "$stateProvider",
                "$urlRouterProvider"
            ];
            AppRouterConfig = __decorate([
                app.Config
            ], AppRouterConfig);
            return AppRouterConfig;
        })();
    })(appRouter = app.appRouter || (app.appRouter = {}));
})(app || (app = {}));
