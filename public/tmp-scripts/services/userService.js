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
    var userService;
    (function (userService) {
        var UserService = (function () {
            function UserService(dbConnectorService) {
                /**
                 *
                 * @param data
                 * @returns {boolean}
                 */
                this.validateAuthentication = function (data) {
                    return typeof data === 'object' && typeof data.username === 'string' && typeof data.password === 'string';
                };
                /**
                 *
                 * @param data
                 * @param $resource
                 * @param callback
                 * @returns {boolean}
                 */
                this.proceed = function (data, $resource, callback) {
                    var self = this;
                    this.dbConnectorService.save($resource.$resource, data, function (resp) {
                        self.identity = angular.extend(data, { auth: resp.auth, roles: resp.roles });
                        self.dbConnectorService.setHeader({
                            'Authorization': resp.auth
                        });
                        sessionStorage.setItem('identity', JSON.stringify(self.identity));
                        callback.call(self, self.identity);
                    });
                    return true;
                };
                /**
                 *
                 * @param data
                 * @param $resource
                 * @param callback
                 * @returns {boolean}
                 */
                this.authenticateUser = function (data, $resource, callback) {
                    if (this.validateAuthentication(data)) {
                        return this.proceed(data, $resource, callback);
                    }
                    return false;
                };
                /**
                 *
                 */
                this.resetIdentity = function () {
                    this.identity = {
                        roles: ['guest']
                    };
                    var identity = sessionStorage.getItem('identity');
                    if (typeof identity === 'string') {
                        sessionStorage.setItem('identity', this.identity);
                    }
                };
                /**
                 *
                 * @returns {Object|function(any=): any|{roles: string[]}|any|*}
                 */
                this.getIdentity = function () {
                    var identity = sessionStorage.getItem('identity'), self = this;
                    if (typeof identity === 'string') {
                        identity = JSON.parse(identity);
                        if (identity['auth']) {
                            self.dbConnectorService.setHeader({
                                'Authorization': identity['auth']
                            });
                        }
                        return identity;
                    }
                    if (typeof identity === 'undefined' || identity === null) {
                        this.identity = {
                            roles: ['guest']
                        };
                    }
                    return this.identity;
                };
                this.dbConnectorService = dbConnectorService;
                return this;
            }/*<auto_generate>*/UserService.$inject = ['dbConnectorService'];UserService.$componentName = 'userService'/*</auto_generate>*/
            UserService.$inject = [
                'dbConnectorService'
            ];
            UserService.$componentName = 'userService';
            UserService = __decorate([
                app.Service
            ], UserService);
            return UserService;
        })();
    })(userService = app.userService || (app.userService = {}));
})(app || (app = {}));
