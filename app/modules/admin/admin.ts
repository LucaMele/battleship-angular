/// <reference path="../../router.ts" />
module app.admin{
    export var identifier:string = 'admin';

    @app.Controller
    export class AdminController implements appComponent{

        static $inject = [
            'adminDbFactory', 'dbConnectorService','toastr'
        ];


        public componentName;
        public adminDbFactory;
        public dbConnectorService;
        public data;
        public toastr;

        constructor(adminDbFactory, dbConnectorService, toastr) {
            this.adminDbFactory = adminDbFactory;
            this.dbConnectorService = dbConnectorService;
            this.componentName = 'admin';
            this.data = {};
            this.toastr = toastr;
        }

        submit = function(data) {
            var self = this;
            if (!data.role) {
                this.toastr.warning('Error', 'Please select a role');
            }else {
                this.dbConnectorService.connect(this.adminDbFactory.postNewUser(), data, function (resp) {
                    self.data = {
                        name: data.username,
                        id: resp.id,
                        roles: [data.role]
                    };
                });
            }

        }
    }

    angular.module(identifier, []);
}