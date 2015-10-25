/// <reference path="../../router.ts" />
module app.accessdenied{
    export var identifier:string = 'accessdenied';

    @app.Controller
    class AccessdeniedController implements appComponent{
        public componentName;

        constructor(public $scope: angular.IScope) {
            this.componentName = 'accessdenied';
        }

    }

    export class AccessdeniedStateController{
        constructor(public $scope: angular.IScope) {
            console.log('dddddddd');
        }
    }
}