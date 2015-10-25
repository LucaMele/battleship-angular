module app.bootstrap
{
    @app.Run
    class AppBootstrap
    {
        static $inject = [
            '$rootScope',
            '$state',
            '$stateParams',
            'auth',
            'user'
        ];

        constructor(
            $rootScope, $state, $stateParams, auth, user
        ){
            $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                if (auth.canAccess(user.getIdentity(), toState)) {
                    auth.authorize(user, toState);
                } else {
                    event.preventDefault();
                    auth.isUnathorized();
                }
            });
        }
    }
}