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
/**
 * Created by Luca on 25.10.2015.
 */
var app;
(function (app) {
    var dbConnectorService;
    (function (dbConnectorService) {
        var DbConnectorService = (function () {
            function DbConnectorService($resource) {
                this.post = function () {
                    // $resource
                };
                return this;
            }/*<auto_generate>*/DbConnectorService.$inject = ['$resource'];DbConnectorService.$componentName = 'dbConnectorService'/*</auto_generate>*/
            DbConnectorService.$inject = [
                '$resource'
            ];
            DbConnectorService.$componentName = 'dbConnector';
            DbConnectorService = __decorate([
                app.Service
            ], DbConnectorService);
            return DbConnectorService;
        })();
    })(dbConnectorService = app.dbConnectorService || (app.dbConnectorService = {}));
})(app || (app = {}));
