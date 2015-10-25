/**
 * Created by Luca on 25.10.2015.
 */
module app.authFactory
{
    @app.Factory
    class AuthFactory
    {
        static $inject = [
            '$rootScope', '$state', 'user'
        ];

        static $componentName = 'auth';

        private $rootScope;
        private $state;
        private user;

        constructor($rootScope, $state, user){
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.user = user;
            return this;
        }

        canAccess = function(user, toState){
            var neededRoles = toState.data.roles,
                userRoles = user.roles,
                i, l, ii, ll;
            console.log(toState);
            if (!neededRoles || !neededRoles.length) {
                return true;
            }
            for (i = 0, l = neededRoles.length; i < l; i++) {
                for (ii = 0, ll = userRoles.length; ii < ll; ii++) {

                    if (userRoles[ii] === neededRoles[i]) {
                        console.log(userRoles[ii], neededRoles[i])
                        return true;
                    }
                }
            }
            return false;
        };

        authorize = function(user) {
            console.log(user);
        };

        isUnathorized = function() {
            console.log(this.$state);
            this.$state.go('accessdenied');
        };
    }
}