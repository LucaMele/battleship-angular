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
    var loginDbFactory;
    (function (loginDbFactory) {
        var LoginDbFactory = (function () {
            function LoginDbFactory($resource) {
                /**
                 *
                 * @returns {any}
                 */
                this.postLogin = function () {
                    return {
                        $resource: this.$resource('/login'),
                        method: 'post'
                    };
                };
                this.$resource = $resource;
                return this;
            }
            LoginDbFactory.$componentName = 'loginDbFactory';
            LoginDbFactory.$inject = [
                "$resource"
            ];
            LoginDbFactory = __decorate([
                app.Factory
            ], LoginDbFactory);
            return LoginDbFactory;
        })();
    })(loginDbFactory = app.loginDbFactory || (app.loginDbFactory = {}));
})(app || (app = {}));
