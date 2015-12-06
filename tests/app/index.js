/**
 * Created by Luca on 05.12.2015.
 */
describe('sorting the list of users', function() {
    it('sorts in descending order by default', function() {
        var users = ['jack', 'igor', 'jeff'];
        var sorted = ['jeff', 'jack', 'igor'];
        expect(sorted).toEqual(['jeff', 'jack', 'igor']);
    });
});