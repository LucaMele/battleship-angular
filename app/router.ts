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
                .state(admin.identifier , {
                    url: '/admin',
                    parent: 'home',
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
                .state(login.identifier , {
                    url: '/login',
                    parent: 'home',
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
                .state(game.identifier , {
                    url: '/game',
                    parent: 'home',
                    data: {
                        roles: ['user', 'admin']
                    },
                    views:{
                        "content@":{
                            templateUrl: game.identifier + '/templates/index.html',
                        }
                    }
                })
                .state(home.identifier , {
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