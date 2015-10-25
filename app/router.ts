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
                .state('site.' + accessdenied.identifier , {
                    url: '/denied',
                    data: {
                        roles: []
                    },
                    views:{
                        "content@":{
                            templateProvider: function($templateCache: angular.ITemplateCacheService){
                                return $templateCache.get(accessdenied.identifier + '/templates/index.html');
                            },
                            controller: accessdenied.AccessdeniedStateController
                        }
                    },
                    clearHistory: true
                })
                .state('site.' + home.identifier , {
                    url: '/home',
                    data: {
                        roles: ['user']
                    },
                    views:{
                        "content@":{
                            templateProvider: function($templateCache: angular.ITemplateCacheService){
                                return $templateCache.get(home.identifier + '/templates/index.html');
                            },
                            controller: home.HomeStateController
                        }
                    },
                    clearHistory: true
                });


            $urlRouterProvider.otherwise('/home');
        }

    }
}