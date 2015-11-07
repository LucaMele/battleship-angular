module app.bootstrap
{
    @app.Run
    class AppBootstrap
    {
        static $inject = [
            '$rootScope',
            '$state',
            '$stateParams',
            'authService',
            'userService'
        ];

        constructor(
            $rootScope, $state, $stateParams, authService, userService
        ){
            $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                if (!authService.isAuthorized(toState)) {
                    event.preventDefault();
                    authService.isUnathorized();
                }
            });
        }
    }
}