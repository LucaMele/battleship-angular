/**
 * Created by Luca on 25.10.2015.
 */
module app.authFactory
{
    @app.Factory
    class AuthFactory
    {
        static $inject = [
            '$rootScope', '$state', '$location', 'user'
        ];

        static $componentName = 'auth';

        private $rootScope;
        private $state;
        private $location;
        private user;

        constructor($rootScope, $state, $location, user){
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$location = $location;
            this.user = user;
            return this;
        }

        canAccess = function(user, toState){
            var neededRoles = toState.data.roles,
                userRoles = user.roles,
                i, l, ii, ll;
            if (!neededRoles || !neededRoles.length) {
                return true;
            }
            for (i = 0, l = neededRoles.length; i < l; i++) {
                for (ii = 0, ll = userRoles.length; ii < ll; ii++) {

                    if (userRoles[ii] === neededRoles[i]) {
                        return true;
                    }
                }
            }
            return false;
        };

        authorize = function(user, toState) {

        };

        isUnathorized = function() {

            this.$state.go('site.accessdenied');

        };
    }
}