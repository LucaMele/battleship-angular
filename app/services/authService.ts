/**
 * Created by Luca on 25.10.2015.
 */
module app.authService
{
    @app.Service
    class AuthService
    {
        static $inject = [
            '$rootScope', '$state', '$location', 'userService'
        ];

        static $componentName = 'authService';

        private $rootScope;
        private $state;
        private $location;
        private userService;

        constructor($rootScope, $state, $location, userService){
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$location = $location;
            this.userService = userService;
            return this;
        }

        /**
         *
         * @param user
         * @param toState
         * @returns {boolean}
         */
        private canAccess = function(user, toState){
            var neededRoles = toState.data.roles,
                userRoles = user.roles ? user.roles : [],
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

        /**
         *
         * @param toState
         */
        public navigateTo = function(toState) {
            this.$state.go(toState);
        };

        /**
         *
         * @param toState
         * @returns {boolean}
         */
        public isAuthorized = function(toState) {
            var user = this.userService.getIdentity();
            return this.canAccess(user, toState);
        };

        /**
         *
         */
        public isUnathorized = function() {
            this.$state.go('login');
        };
    }
}