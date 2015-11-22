
module app.game.turns{

    export var identifier:string = 'turnsHandler';

    export class TurnsHandler{

        private $timeout;
        private data;
        private board;
        private gameDbFactory;

        constructor($timeout, board, gameDbFactory, data) {
            this.$timeout = $timeout;
            this.data = data;
            this.board = board;
            this.gameDbFactory = gameDbFactory;

            this.setupFirstTurn();
        }

        setupFirstTurn = function() {
            console.log('deded');
            this.dbConnectorService.connect(this.gameDbFactory.setTurn(this.data.idGame), {}, function(data) {

            });
        };
    }
}