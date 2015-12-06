/**
 * Created by Luca on 05.12.2015.
 */

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
        var $scope = {};
        var result = {};
        var controller = $controller('LoginController', { $scope: $scope });
        var identity = {'auth':'333333333','roles':['admin']};
        httpBackend.whenPOST('/login').respond(identity);
        controller.submit({'username': 'test', 'password': 'test'}).then(function() {
            result = userSerive.getIdentity();
            expect(result.username).toEqual('test');
            expect(result.password).toEqual('test');
            expect(result.auth).toEqual('333333333');
            expect(result.roles[0]).toEqual('admin');
            done();
        });
        httpBackend.flush();
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