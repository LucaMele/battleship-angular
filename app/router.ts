/// <reference path="app.ts" />

module appRouter
{
    @app.Config
    class AppRouterConfig implements AngularConfig
    {
        public dependencies = [];
        public templateCache: angular.ITemplateCacheService;

        constructor($templateCache: angular.ITemplateCacheService){
            this.dependencies = ["$stateProvider", "$urlRouterProvider", this.callback];
            this.templateCache = $templateCache;
        }
        createStateObject = (identifier: string) => {
            return {
                url: '/' + identifier,
                templateUrl: this.templateCache.get('./app/modules/' + identifier + '/templates/index.html'),
                controller: function() {

                },
                clearHistory: true
            }
        };
        callback = (
            $stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider
        ) => {
            $stateProvider
                .state("menu", <angular.ui.IState>
                {
                    url: "/menu",
                    abstract: true
                })
                // home module
                .state('menu.' + home.identifier, this.createStateObject(home.identifier));


            $urlRouterProvider.otherwise('/menu/home');

        }
    }
}