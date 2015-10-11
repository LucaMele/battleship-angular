module app.appRouter
{
    @app.Config
    class AppRouterConfig
    {
        static $inject = [
            "$stateProvider",
            "$urlRouterProvider"
        ];

        constructor(
            $stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider
        ){
            $stateProvider
                .state(home.identifier , {
                    url: '/' + home.identifier,
                    templateProvider: function($templateCache: angular.ITemplateCacheService){
                        return $templateCache.get(home.identifier + '/templates/index.html');
                    },
                    controller: home.HomeStateController
                });


            $urlRouterProvider.otherwise('/home');
        }

    }
}