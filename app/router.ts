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
                })
                .state('site.' + home.identifier + '.' + admin.identifier , {
                    url: '/admin',
                    data: {
                        roles: ['admin']
                    },
                    views:{
                        "content@":{
                            templateProvider: function($templateCache: angular.ITemplateCacheService){
                                return $templateCache.get(admin.identifier + '/templates/index.html');
                            },
                            controller: admin.AdminController
                        }
                    }
                })
                .state('site.' + login.identifier , {
                    url: '/login',
                    data: {
                        roles: []
                    },
                    views:{
                        "content@":{
                            templateProvider: function($templateCache: angular.ITemplateCacheService){
                                return $templateCache.get(login.identifier + '/templates/index.html');
                            },
                            controller: login.LoginController
                        }
                    }
                })
                .state('site.' + game.identifier , {
                    url: '/game',
                    data: {
                        roles: ['user', 'admin']
                    },
                    views:{
                        "content@":{
                            templateProvider: function($templateCache: angular.ITemplateCacheService){
                                return $templateCache.get(game.identifier + '/templates/index.html');
                            },
                            controller: game.GameController
                        }
                    }
                })
                .state('site.' + home.identifier , {
                    url: '/home',
                    data: {
                        roles: ['user', 'admin']
                    },
                    views:{
                        "content@":{
                            templateProvider: function($templateCache: angular.ITemplateCacheService){
                                return $templateCache.get(home.identifier + '/templates/index.html');
                            },
                            controller: home.HomeController
                        }
                    }
                });


            $urlRouterProvider.otherwise('/home');
        }

    }
}