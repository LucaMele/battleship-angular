/// <reference path="../../router.ts" />
module app.login{
    export var identifier:string = 'login';

    @app.Controller
    class LoginController implements appComponent{
        public componentName;

        constructor(public $scope: angular.IScope) {
            this.componentName = 'login';
        }

    }

    export class LoginStateController{

        constructor(public $scope: angular.IScope) {
            $scope['date'] = new Date();
        }
    }
}