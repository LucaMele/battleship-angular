/// <reference path="../../router.ts" />
module app.admin{
    export var identifier:string = 'admin';

    @app.Controller
    export class AdminController implements appComponent{

        static $inject = [
            'adminDbFactory', 'dbConnectorService'
        ];


        public componentName;
        public adminDbFactory;
        public dbConnectorService;

        constructor(adminDbFactory, dbConnectorService) {
            this.adminDbFactory = adminDbFactory;
            this.dbConnectorService = dbConnectorService;
            this.componentName = 'admin';
        }

        submit = function(data) {
            var self = this;
            this.dbConnectorService.connect(this.adminDbFactory.postNewUser(), data, function() {
                console.log('wwww');
            });
        }
    }
}