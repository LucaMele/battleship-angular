module app.appRouter
{
    @app.Config
    class AppRouterConfig
    {
        static $inject = [
            "$stateProvider",
            "$urlRouterProvider"
        ];

        /**
         *
         * @param $stateProvider
         * @param $urlRouterProvider
         */
        constructor(
            $stateProvider,
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
                .state(register.identifier , {
                    url: '/register',
                    data: {
                        roles: []
                    },
                    views:{
                        "content@":{
                            templateUrl: register.identifier + '/templates/index.html',
                            controller: register.RegisterController
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
                            controller: game.GameBoardController,
                            controllerAs: 'gameBoardCtrl'
                        }
                    }
                })
                .state(home.identifier , {
                    url: '/home',
                    data: {
                        roles: ['guest', 'user', 'admin']
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