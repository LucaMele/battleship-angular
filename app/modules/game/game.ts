/// <reference path="../../router.ts" />
module app.game{
    export var identifier:string = 'game';

    @app.Controller
    export class GameController implements appComponent{
        public componentName;

        static $inject = [
            "dbConnectorService", "gameDbFactory"
        ];

        private dbConnectorService;
        private gameDbFactory;

        constructor(dbConnectorService, gameDbFactory) {
            this.componentName = 'game';
            this.dbConnectorService = dbConnectorService;
            this.gameDbFactory = gameDbFactory;

            // test
            var self = this;
            dbConnectorService.connect(this.gameDbFactory.getGame(), {}, function(data) {
                self['data'] = data;
            });
        }

    }
}