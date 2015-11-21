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
                .state('site.' + admin.identifier , {
                    url: '/admin',
                    data: {
                        roles: ['admin']
                    },
                    views:{
                        "content@":{
                            templateUrl: admin.identifier + '/templates/index.html',
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
                            templateUrl: login.identifier + '/templates/index.html',
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
                            templateUrl: game.identifier + '/templates/index.html',
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
                            templateUrl: home.identifier + '/templates/index.html',
                            controller: home.HomeController
                        }
                    }
                });


            $urlRouterProvider.otherwise('/home');
        }

    }
}