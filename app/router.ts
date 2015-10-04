module appRouter
{
    @app.Config
    class AppRouterConfig implements AngularConfig
    {
        public dependencies = [];

        constructor(){
            this.dependencies = ["$stateProvider", "$urlRouterProvider", this.callback];
        }
        static createStateObject(identifier: string) {
            return {
                url: '/' + identifier,
                templateUrl: 'app/modules' + identifier + 'templates/index.html',
                clearHistory: true
            }
        }
        public callback(
            $stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider
        ) {

            $stateProvider
                .state("app", <angular.ui.IState>
                {
                    url: "/menu",
                    abstract: true
                })
                // home module
                .state('menu.' + home.identifier, AppRouterConfig.createStateObject(home.identifier));



        }
    }


}