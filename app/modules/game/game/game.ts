
module app.game.manager{

    export var identifier:string = 'gameManager';

    export class GameExecutionController{



        private dbConnectorService;
        private gameDbFactory;
        private userService;

        constructor(dbConnectorService, gameDbFactory, userService) {
            this.dbConnectorService = dbConnectorService;
            this.userService = userService;
            this.gameDbFactory = gameDbFactory;
        }

        start = function(ships, cells) {
            var self = this,
                username = this.userService.getIdentity().username;
            this.ships = ships;
            this.cells = cells;
            console.log(username);
            this.dbConnectorService.connect(this.gameDbFactory.saveReady(), {username: username, cells: this.cells}, function(data) {
                console.log('data', data)
            });
        }
    }
}