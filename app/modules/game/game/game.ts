
module app.game.manager{

    export var identifier:string = 'gameManager';

    export class GameExecutionController{
        private dbConnectorService;
        private gameDbFactory;
        private userService;
        private $timeout;
        private board;
        private timer;

        constructor($scope, board, dbConnectorService, gameDbFactory, userService, $timeout) {
            var self = this;
            this.dbConnectorService = dbConnectorService;
            this.userService = userService;
            this.$timeout = $timeout;
            this.gameDbFactory = gameDbFactory;
            this.board = board;
            if (this.timer) {
                $timeout.cancel(this.timer);
            }
            $scope.$on("$destroy", function() {
                if (self.timer) {
                    $timeout.cancel(self.timer);
                }
            });
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
                if (this.timer) {
                    this.$timeout.cancel(self.this);
                }
            }
        };


        /**
         *
         */
        continuesCheck = function () {
            var self = this;
            if (self.timer) {
                self.$timeout.cancel(self.timer);
            }
            this.dbConnectorService.connect(this.gameDbFactory.checkGame(this.idGame), {}, function(data) {
                self.timer = self.$timeout(function(){
                    self.handleStatus.call(self, data);
                }, 1000);
            });
        };
    }
}