
module app.game.turns{

    export var identifier:string = 'turnsHandler';

    export class TurnsHandler{

        private $timeout;
        private data;
        private board;
        private dbConnectorService;
        private gameDbFactory;

        constructor($timeout, board, gameDbFactory, dbConnectorService, data) {
            this.$timeout = $timeout;
            this.data = data;
            this.dbConnectorService = dbConnectorService;
            this.board = board;

            this.gameDbFactory = gameDbFactory;

            this.setupFirstTurn();
        }

        /**
         *
         */
        setupFirstTurn = function() {
            var self = this;

            this.dbConnectorService.connect(this.gameDbFactory.setTurn(this.data.idGame), {}, function(data) {
                console.log(self.board.status_messages)
                self.board.status_messages = 'Is turn of ' + data.isTurn;

                console.log(self.board.status_messages)
            });
        };
    }
}