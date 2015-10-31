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
    var userFactory;
    (function (userFactory) {
        var UserFactory = (function () {
            function UserFactory($q, $timeout, dbConnector) {
                this.getIdentity = function () {
                    return {
                        id: 1,
                        roles: ['guest'],
                        username: 'giovanni'
                    };
                };
                this.dbConnector = dbConnector;
                return this;
            }
            UserFactory.$inject = [
                '$q', '$timeout', 'dbConnector'
            ];
            UserFactory.$componentName = 'user';
            UserFactory = __decorate([
                app.Factory
            ], UserFactory);
            return UserFactory;
        })();
    })(userFactory = app.userFactory || (app.userFactory = {}));
})(app || (app = {}));
