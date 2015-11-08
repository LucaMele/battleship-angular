/// <reference path="../../router.ts" />
module app.admin{
    export var identifier:string = 'admin';

    @app.Controller
    export class AdminController implements appComponent{

        static $inject = [

        ];

        public componentName;

        constructor() {

            this.componentName = 'admin';
        }
    }
}