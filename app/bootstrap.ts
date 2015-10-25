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
            console.log('eee');
            $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;

                console.log(auth.canAccess(user.getIdentity(), toState));

                if (auth.canAccess(user.getIdentity(), toState)) {
                    auth.authorize(user);
                } else {
                    auth.isUnathorized();
                }
            });
        }
    }
}