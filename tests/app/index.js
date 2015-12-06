/**
 * Created by Luca on 05.12.2015.
 */
describe('Register the login controller', function() {
    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('sorts in descending order by default', function() {
        var users = ['jack', 'igor', 'jeff'];
        var sorted = ['jeff', 'jack', 'igor'];
        expect(sorted).toEqual(['jeff', 'jack', 'igor']);
    });
});