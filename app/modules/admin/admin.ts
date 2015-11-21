/// <reference path="../../router.ts" />
module app.admin{
    export var identifier:string = 'admin';

    @app.Controller
    export class AdminController implements appComponent{

        static $inject = [
            'adminDbFactory', 'dbConnectorService','toastr', 'errorFactory'
        ];


        public componentName;
        public adminDbFactory;
        public dbConnectorService;
        public errorFactory;
        public data;
        public toastr;

        constructor(adminDbFactory, dbConnectorService, toastr, errorFactory) {
            this.adminDbFactory = adminDbFactory;
            this.dbConnectorService = dbConnectorService;
            this.errorFactory = errorFactory;
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
                    console.log(resp);
                    console.log(self.errorFactory.getError(resp.data.error));
                    // @todo if no error, procede
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