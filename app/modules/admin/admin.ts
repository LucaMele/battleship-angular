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
        public data;

        constructor(adminDbFactory, dbConnectorService) {
            this.adminDbFactory = adminDbFactory;
            this.dbConnectorService = dbConnectorService;
            this.componentName = 'admin';
            this.data = {};
        }

        submit = function(data) {
            var self = this;
            console.log(this.data.role);
            this.dbConnectorService.connect(this.adminDbFactory.postNewUser(), data, function(resp) {
                self.data = {
                    name: data.username,
                    id: resp.id,
                    roles: [data.role]
                };
            });
        }
    }

    angular.module(identifier, []);
}