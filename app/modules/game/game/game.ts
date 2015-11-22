
module app.game.manager{

    export var identifier:string = 'gameManager';

    export class GameExecutionController{



        private dbConnectorService;
        private gameDbFactory;
        private userService;
        private $timeout;
        private board;

        constructor(board, dbConnectorService, gameDbFactory, userService, $timeout) {
            this.dbConnectorService = dbConnectorService;
            this.userService = userService;
            this.$timeout = $timeout;
            this.gameDbFactory = gameDbFactory;
            this.board = board;
        }

        /**
         *
         * @param ships
         * @param cells
         */
        start = function(ships, cells) {
            var self = this,
                username = this.userService.getIdentity().username;
            this.ships = ships;
            this.cells = cells;
            console.log(username);
            this.dbConnectorService.connect(this.gameDbFactory.saveReady(), {username: username, cells: this.cells}, function(data) {
                self.handleStatus(data);
                self.board.compeeter = data.compeeter;
                self.board.status = data.status;
            });
        };

        /**
         *
         * @param data
         */
        handleStatus = function(data) {
            if (data.status === 'IDLE') {
                this.continuesCheck();
            }
        };


        continuesCheck = function () {
            console.log('dededed');
            var self = this;
            this.$timeout(function(){
                self.continuesCheck.call(self);
            }, 800);
        };
    }
}