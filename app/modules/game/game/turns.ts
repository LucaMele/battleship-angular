
module app.game.turns{

    export var identifier:string = 'turnsHandler';

    export class TurnsHandler{

        private $timeout;
        private $state;
        private data;
        private board;
        private dbConnectorService;
        private gameDbFactory;
        private cells;
        private username;
        private timer;
        private cellsOpponent;

        /**
         *
         * @param $timeout
         * @param board
         * @param $state
         * @param gameDbFactory
         * @param dbConnectorService
         * @param data
         * @param username
         */
        constructor($timeout: angular.ITimeoutService,
                    board: app.game.GameBoardController,
                    $state: angular.ui.IState,
                    gameDbFactory, dbConnectorService, data, username: string) {
            this.$timeout = $timeout;
            this.$state = $state;
            this.data = data;
            this.dbConnectorService = dbConnectorService;
            this.board = board;
            this.username = username;
            this.gameDbFactory = gameDbFactory;
            this.setupFirstTurn();
        }

        /**
         *
         */
        setupFirstTurn = function() {
            var self = this;
            this.dbConnectorService.connect(this.gameDbFactory.setTurn(this.data.idGame), {}, function(data) {
                self.board.status_messages = 'Is turn of ' + data.isTurn;
                self.handleMaps.call(self, data);
            });
        };

        /**
         *
         * @param data
         */
        handleMaps = function(data) {
            var self = this;
            this.dbConnectorService.connect(this.gameDbFactory.getMaps(this.data.idGame), {}, function(maps) {
                if (maps.status === 418) {
                    self.$state.go(self.$state.current.name, self.$state.params, { reload: true });
                    self.board.toastr.info('Game does not exist anymore. Please start a new one');
                    return;
                }
                self.cells = maps.cells;
                self.cellsOpponent = maps.cellsOpponent;
                self.board.gameStarted = true;
                self.handleTurn.call(self, maps);
            });
        };

        /**
         *
         * @param maps
         */
        handleTurn = function(maps){
            var self = this;
            if (maps.isWinner !== '') {
                self.board.cells = self.cells;
                self.board.status_messages = 'We have a WINNER!!! Congrats to ' + maps.isWinner;
                self.board.toastr.success('We have a WINNER!!! Congrats to ' + maps.isWinner,' Congratulations');
                self.board.idleTurn = true;
                return;
            }
            if (this.username === maps.turn) {
                if (self.timer) {
                    self.$timeout.cancel(self.timer);
                }
                self.board.idleTurn = true;
                self.board.status_messages = 'Have a look at your map to see what happened';
                self.timer = self.$timeout(function() {
                    self.board.status_messages = 'Is your turn. Select a empty water cell to launch a bomb';
                    self.board.cells = self.cellsOpponent;
                    self.board.idleTurn = false;
                    self.board.boardStatus = 'board-active';
                }, 3000);
                self.board.cells = self.cells;
            } else {
                self.board.cells = self.cells;
                self.board.idleTurn = true;
                self.board.boardStatus = 'board-passive';
                self.checkIfMoved();
            }
        };


        /**
         *
         */
        checkIfMoved = function() {
            var self = this;
            if (self.timer) {
                self.$timeout.cancel(self.timer);
            }
            self.timer = self.$timeout(function() {
                self.handleMaps();
            }, 1500);
        }
    }
}