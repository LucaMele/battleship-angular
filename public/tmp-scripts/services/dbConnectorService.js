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
            function DbConnectorService() {
                /**
                 *
                 * @param header
                 */
                this.setHeader = function (header) {
                    this.config = {
                        headers: header
                    };
                };
                /**
                 *
                 * @param resource
                 * @param data
                 * @param callback
                 */
                this.connect = function (resource, data, callback) {
                    switch (resource.method) {
                        case 'get':
                            resource.$resource.get(null, this.config).$promise.then(callback);
                            break;
                        default:
                            console.error('unknown method in db connector service');
                            break;
                    }
                };
                /**
                 *
                 * @param $resource
                 * @param data
                 * @param callback
                 */
                this.save = function ($resource, data, callback) {
                    if (typeof $resource.save === 'function' && typeof data === 'object') {
                        $resource.save(data).$promise.then(callback);
                        return true;
                    }
                    console.error('Invalid arguments passed at the method save in the DB donnector');
                    return false;
                };
                this.config = {
                    headers: {}
                };
                return this;
            }/*<auto_generate>*/DbConnectorService.$inject = [];DbConnectorService.$componentName = 'dbConnectorService'/*</auto_generate>*/
            /**
             *
             * @type {string}
             */
            DbConnectorService.$componentName = 'dbConnectorService';
            DbConnectorService = __decorate([
                app.Service
            ], DbConnectorService);
            return DbConnectorService;
        })();
    })(dbConnectorService = app.dbConnectorService || (app.dbConnectorService = {}));
})(app || (app = {}));
