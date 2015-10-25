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
                .state('site', {
                    'abstract': true
                    /*resolve: {
                        authorize: ['auth',
                            function(authorization) {
                                return authorization.authorize();
                            }
                        ]
                    }*/
                })
                .state(accessdenied.identifier , {
                    url: '/' + accessdenied.identifier,
                    data: {
                        roles: []
                    },
                    templateProvider: function($templateCache: angular.ITemplateCacheService){
                        return $templateCache.get(accessdenied.identifier + '/templates/index.html');
                    },
                    controller: accessdenied.AccessdeniedStateController
                })
                .state(home.identifier , {
                    url: '/' + home.identifier,
                    data: {
                        roles: ['user']
                    },
                    templateProvider: function($templateCache: angular.ITemplateCacheService){
                        return $templateCache.get(home.identifier + '/templates/index.html');
                    },
                    controller: home.HomeStateController
                });


            $urlRouterProvider.otherwise('/home');
        }

    }
}