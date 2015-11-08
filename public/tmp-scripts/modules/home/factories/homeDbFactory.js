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
    var homeDbFactory;
    (function (homeDbFactory) {
        var HomeDbFactory = (function () {
            function HomeDbFactory($resource) {
                /**
                 *
                 * @returns {any}
                 */
                this.getHome = function () {
                    return {
                        $resource: this.$resource('/home'),
                        method: 'get'
                    };
                };
                this.$resource = $resource;
                return this;
            }
            HomeDbFactory.$componentName = 'homeDbFactory';
            HomeDbFactory.$inject = [
                "$resource"
            ];
            HomeDbFactory = __decorate([
                app.Factory
            ], HomeDbFactory);
            return HomeDbFactory;
        })();
    })(homeDbFactory = app.homeDbFactory || (app.homeDbFactory = {}));
})(app || (app = {}));
