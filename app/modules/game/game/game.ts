
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
            this.dbConnectorService.connect(this.gameDbFactory.saveReady(), {username: username, cells: this.cells}, function(data) {
                self.idGame = data.idGame;
                self.board.gameIsActive = true;
                self.board.isReady = false;
                self.board.compeeter = data.compeeter;
                self.board.status = data.status;
                self.handleStatus(data);
            });
        };

        /**
         *
         * @param data
         */
        checkIdle = function(data) {
            this.idGame = data.idGame;
            this.handleStatus(data);
        };

        /**
         *
         * @param data
         */
        handleStatus = function(data) {
            if (data.status === 'IDLE') {
                this.continuesCheck();
            } else {
                this.idGame = data.idGame;
                this.board.gameIsActive = true;
                this.board.isReady = false;
                this.board.compeeter = data.compeeter;
                this.board.status = data.status;
            }
        };


        continuesCheck = function () {
            var self = this;

            this.dbConnectorService.connect(this.gameDbFactory.checkGame(this.idGame), {}, function(data) {
                console.log(data);
                self.$timeout(function(){
                    self.handleStatus.call(self, data);
                }, 1000);
            });

        };
    }
}