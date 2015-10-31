var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/**
 * Created by Luca on 25.10.2015.
 */
var app;
(function (app) {
    var authService;
    (function (authService) {
        var AuthService = (function () {
            function AuthService($rootScope, $state, $location, user) {
                this.canAccess = function (user, toState) {
                    var neededRoles = toState.data.roles, userRoles = user.roles, i, l, ii, ll;
                    if (!neededRoles || !neededRoles.length) {
                        return true;
                    }
                    for (i = 0, l = neededRoles.length; i < l; i++) {
                        for (ii = 0, ll = userRoles.length; ii < ll; ii++) {
                            if (userRoles[ii] === neededRoles[i]) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                this.authorize = function (user, toState) {
                };
                this.isUnathorized = function () {
                    this.$state.go('site.login');
                };
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$location = $location;
                this.user = user;
                return this;
            }/*<auto_generate>*/AuthService.$inject = ['$rootScope','$state','$location','user'];AuthService.$componentName = 'authService'/*</auto_generate>*/
            AuthService.$inject = [
                '$rootScope', '$state', '$location', 'user'
            ];
            AuthService.$componentName = 'auth';
            AuthService = __decorate([
                app.Service
            ], AuthService);
            return AuthService;
        })();
    })(authService = app.authService || (app.authService = {}));
})(app || (app = {}));
