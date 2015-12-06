/**
 * Created by Luca on 05.12.2015.
 */

/**
 *
 * @param httpBackend
 * @param $controller
 * @param role
 * @param callback
 * @param done
 * @param userSerive
 */
var loginMain = function(httpBackend, $controller, role, callback, done, userSerive) {
    var $scope = {};
    var result = {};
    var controller = $controller('LoginController', { $scope: $scope });
    var identity = {'auth':'333333333','roles':[role]};
    httpBackend.whenPOST('/login').respond(identity);
    controller.submit({'username': 'test', 'password': 'test'}).then(function() {
        result = userSerive.getIdentity();
        expect(result.username).toEqual('test');
        expect(result.password).toEqual('test');
        expect(result.auth).toEqual('333333333');
        expect(result.roles[0]).toEqual(role);
        callback();
        done();
    });
    httpBackend.flush();
};

/**
 *
 * @param httpBackend
 * @param $controller
 * @param callback
 * @param done
 * @param userSerive
 */
var loginAdmin = function(httpBackend, $controller, callback, done, userSerive) {
    loginMain(httpBackend, $controller, 'admin', callback, done, userSerive);
};

/**
 *
 * @param httpBackend
 * @param $controller
 * @param callback
 * @param done
 * @param userSerive
 */
var loginUser = function(httpBackend, $controller, callback, done, userSerive) {
    loginMain(httpBackend, $controller, 'user', callback, done, userSerive);
};

describe('Login Controller', function() {
    var $controller, httpBackend, userSerive;

    beforeEach(module('app'));

    beforeEach(inject(function (_$httpBackend_, _userService_) {
        httpBackend = _$httpBackend_;
        userSerive = _userService_;
    }));

    it('Main angularModule is set', function() {
        expect(angular.module('app')).toEqual(jasmine.any(Object));
    });

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('Has a correct component name', function() {
        var $scope = {};
        expect(app.login.LoginController.$componentName).toEqual('LoginController');
    });

    it('it sets a wrong object and get error', function() {
        var $scope = {};
        var controller = $controller('LoginController', { $scope: $scope });
        expect(controller.submit({'wrong': 'yes'})).toEqual(false);
    });

    it('it sets a correct object and make login', function(done) {
        loginAdmin(httpBackend, $controller, function() {}, done, userSerive);
    });
});


// this test runs after login
describe('User Service', function() {
    var $controller, httpBackend, userSerive;

    beforeEach(module('app'));

    beforeEach(inject(function (_$httpBackend_, _userService_) {
        httpBackend = _$httpBackend_;
        userSerive = _userService_;
    }));

    it('Main angularModule is set', function() {
        expect(angular.module('app')).toEqual(jasmine.any(Object));
    });

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('Can return the identity', function() {
        expect(userSerive.getIdentity()).toEqual(jasmine.any(Object));
    });

    it('authenticateUser returns false if the object is not correct', function() {
        expect(userSerive.authenticateUser({wrong: 'wrong'})).toEqual(false);
    });

    it('userSerive can reset the Session Storage', function() {
        userSerive.resetIdentity();
        expect(sessionStorage.getItem('identity')).toEqual('{"roles":["guest"]}');
    });
});


// this test runs after login
describe('Auth Service', function() {
    var $controller, httpBackend, userSerive, authService;

    beforeEach(module('app'));

    beforeEach(inject(function (_$httpBackend_, _userService_, _authService_) {
        httpBackend = _$httpBackend_;
        userSerive = _userService_;
        authService = _authService_;
    }));

    it('Main angularModule is set', function() {
        expect(angular.module('app')).toEqual(jasmine.any(Object));
    });

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('Handles users access levels correctly', function() {
        userSerive.resetIdentity();
        expect(authService.isAuthorized({
            data: {
                roles: ['guest']
            }
        })).toEqual(true);
        expect(authService.isAuthorized({
            data: {
                roles: ['user']
            }
        })).toEqual(false);
        expect(authService.isAuthorized({
            data: {
                roles: ['admin']
            }
        })).toEqual(false);
    });

    it('Admin can access to administration', function(done) {
        var $scope = {};
        var controller = $controller('LoginController', { $scope: $scope });
        loginAdmin(httpBackend, $controller, function() {
            var data = {
                data: {
                    roles: ['admin']
                }
            };
            expect(authService.isAuthorized(data)).toEqual(true);
        }, done, userSerive);
    });

    it('Handle user role correctly', function(done) {
        var $scope = {};
        var controller = $controller('LoginController', { $scope: $scope });
        userSerive.resetIdentity();
        loginUser(httpBackend, $controller, function() {
            expect(authService.isAuthorized({
                data: {
                    roles: ['admin']
                }
            })).toEqual(false);
            expect(authService.isAuthorized({
                data: {
                    roles: ['user']
                }
            })).toEqual(true);
            expect(authService.isAuthorized({
                data: {
                    roles: ['guest']
                }
            })).toEqual(true);
        }, done, userSerive);
    });
});