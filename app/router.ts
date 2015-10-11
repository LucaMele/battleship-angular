module app.appRouter
{
    @app.Config
    class AppRouterConfig
    {
        static $inject = [
            "$stateProvider",
            "$urlRouterProvider",
            "$templateCacheProvider",
        ];

        constructor(
            $stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider
        ){
            console.log('menu.' + home.identifier)
            $stateProvider
                .state("menu", <angular.ui.IState>
                {
                    url: "/menu",
                    abstract: true
                })
                // home module
                .state('menu.' + home.identifier, {
                    url: '/' + home.identifier,
                    templateProvider: function($templateCache){
                        console.log($templateCache.get(home.identifier + '/templates/index.html'));
                        // simplified, expecting that the cache is filled
                        // there should be some checking... and async $http loading if not found
                        return $templateCache.get(home.identifier + '/templates/index.html');
                    },
                    controller: function() {

                    }
                });


            $urlRouterProvider.otherwise('/menu/home');
        }

    }
}