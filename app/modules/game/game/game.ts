
module app.game.manager{

    export var identifier:string = 'gameManager';

    export class GameExecutionController{
        private dbConnectorService;
        private gameDbFactory;
        private userService;
        private $timeout;
        private freeze;
        private board;
        private timer;

        constructor($scope: angular.IScope,
                    board: game.GameBoardController,
                    dbConnectorService,
                    gameDbFactory,
                    userService,
                    $timeout: angular.ITimeoutService) {
            var self = this;
            this.dbConnectorService = dbConnectorService;
            this.userService = userService;
            this.$timeout = $timeout;
            this.gameDbFactory = gameDbFactory;
            this.board = board;
            this.freeze = false;
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
            this.board.gameIsActive = true;
            this.board.isReady = false;
            this.board.opponent = data.opponent;
            this.board.status = data.status;
            if (data.status === 'IDLE') {
                this.continuesCheck();
            } else {
                this.idGame = data.idGame;
                if (this.timer) {
                    this.$timeout.cancel(this.timer);
                }

                /**
                 *
                 * @type {app.game.turns.TurnsHandler}
                 */
                this.turnsHandler = new game.turns.TurnsHandler(
                    this.$timeout,
                    this.board,
                    this.gameDbFactory,
                    this.dbConnectorService,
                    data,
                    this.userService.getIdentity().username
                );
            }
        };

        /**
         *
         * @param cell
         * @param index
         */
        handleCellClick = function(cell, index) {
            var self = this;
            if(!this.freeze) {
                this.board.status_messages = 'checking..';
                this.freeze = true;
                this.dbConnectorService.connect(this.gameDbFactory.saveMark(), {id: this.idGame, cell: this.board.cells[index], index: index}, function(data) {
                    if (data.cell.cellName === 'ship-marked') {
                        self.board.status_messages = 'Nice shot! Now lets see what ' + self.board.opponent + ' will do. Please wait form him';
                        self.board.cells[index] = new cells.ShipMarked(cell.width, cell.height, cell.index, data.cell.pos, data.cell.isHorizontal, data.cell.size);
                    } else {
                        self.board.status_messages = 'Oh well.. maybe next time. Wait until ' + self.board.opponent + ' has made his move';
                        self.board.cells[index] = new cells.WaterMarked(cell.width, cell.height, cell.index);
                    }
                    self.freeze = false;
                    self.turnsHandler.handleMaps();
                    self.turnsHandler.checkIfMoved();
                });
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