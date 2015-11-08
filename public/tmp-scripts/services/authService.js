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
            function AuthService($rootScope, $state, $location, userService) {
                /**
                 *
                 * @param user
                 * @param toState
                 * @returns {boolean}
                 */
                this.canAccess = function (user, toState) {
                    var neededRoles = toState.data.roles, userRoles = user.roles ? user.roles : [], i, l, ii, ll;
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
                /**
                 *
                 * @param toState
                 */
                this.navigateTo = function (toState) {
                    this.$state.go(toState);
                };
                /**
                 *
                 * @param toState
                 * @returns {boolean}
                 */
                this.isAuthorized = function (toState) {
                    var user = this.userService.getIdentity();
                    return this.canAccess(user, toState);
                };
                /**
                 *
                 */
                this.isUnathorized = function () {
                    this.$state.go('site.login');
                };
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$location = $location;
                this.userService = userService;
                return this;
            }/*<auto_generate>*/AuthService.$inject = ['$rootScope','$state','$location','userService'];AuthService.$componentName = 'authService'/*</auto_generate>*/
            AuthService.$inject = [
                '$rootScope', '$state', '$location', 'userService'
            ];
            AuthService.$componentName = 'authService';
            AuthService = __decorate([
                app.Service
            ], AuthService);
            return AuthService;
        })();
    })(authService = app.authService || (app.authService = {}));
})(app || (app = {}));
