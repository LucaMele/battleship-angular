/// <reference path="../../router.ts" />
module app.home{
    export var identifier:string = 'home';

    @app.Controller
    class HomeController implements appComponent{

        public componentName;

        constructor(public $scope: angular.IScope) {
            this.componentName = 'home';
            $scope['test'] = 'i come from the angular controller';
        }

    }


}