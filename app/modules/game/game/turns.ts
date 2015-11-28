
module app.game.turns{

    export var identifier:string = 'turnsHandler';

    export class TurnsHandler{

        private $timeout;
        private data;
        private board;
        private dbConnectorService;
        private gameDbFactory;
        private cells;
        private username;
        private cellsOpponent;


        constructor($timeout: angular.ITimeoutService,
                    board: app.game.GameBoardController,
                    gameDbFactory, dbConnectorService, data, username: string) {
            this.$timeout = $timeout;
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
                self.board.status_messages = 'Is turn of ' + data.isTurn
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
            if (this.username === maps.turn) {
                self.board.status_messages = 'Is your turn. Select a empty water cell to launch a bomb';
                self.board.cells = self.cellsOpponent;
                self.board.idleTurn = false;
            } else {
                this.board.cells = this.cells;
                this.board.idleTurn = true;
                this.checkIfMoved();
            }
        };


        /**
         *
         */
        checkIfMoved = function() {
            var self = this;
            setTimeout(function() {
                self.handleMaps();
            }, 1500);
        }
    }
}