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
            function DbConnectorService($http, $state) {
                /**
                 *
                 * @param header
                 */
                this.setHeader = function (header) {
                    this.config = {
                        headers: header
                    };
                    this.$http.defaults.headers.common = header;
                };
                this.success = function () {
                };
                /**
                 *
                 * @param response
                 */
                this.error = function (response) {
                    if (response.status === 401 || response.status === 403) {
                        this.$state.go('site.login');
                    }
                };
                /**
                 *
                 * @param resource
                 * @param data
                 * @param callback
                 */
                this.connect = function (resource, data, callback) {
                    var self = this;
                    var error = function (resp) { self.error(resp); };
                    var success = function (resp) { self.error(resp); };
                    switch (resource.method) {
                        case 'get':
                            resource.$resource.get(null, success, error).$promise.then(callback);
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
                    var self = this;
                    var error = function () { self.error(arguments); };
                    var success = function () { self.error(arguments); };
                    if (typeof $resource.save === 'function' && typeof data === 'object') {
                        $resource.save(data, success, error).$promise.then(callback);
                        return true;
                    }
                    console.error('Invalid arguments passed at the method save in the DB donnector');
                    return false;
                };
                this.config = {
                    headers: {}
                };
                this.$http = $http;
                this.$state = $state;
                return this;
            }/*<auto_generate>*/DbConnectorService.$inject = ['$http','$state'];DbConnectorService.$componentName = 'dbConnectorService'/*</auto_generate>*/
            DbConnectorService.$inject = [
                '$http', '$state'
            ];
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
