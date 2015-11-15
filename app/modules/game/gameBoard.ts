/// <reference path="../../router.ts" />
module app.game{
    export var identifier:string = 'game';

    class GameBoardController implements appComponent{
        public componentName;

        static $inject = [
            "dbConnectorService", "gameDbFactory"
        ];

        private dbConnectorService;
        private gameDbFactory;
        public cells;
        public boardWidth;

        constructor(dbConnectorService, gameDbFactory) {
            this.componentName = 'gameBoardController';
            this.dbConnectorService = dbConnectorService;
            this.gameDbFactory = gameDbFactory;
            this.cells = [];
            this.boardWidth = {};
            this.getMap();
        }

        getMap = function() {
            var self = this;
            this.dbConnectorService.connect(this.gameDbFactory.getGame(), {}, function(data) {
                var boardCellsW = +data.w,
                    boardCellsH = +data.h,
                    cellW = +data.cell.w,
                    cellH = +data.cell.h;
                var tmp = [];
                var i;
                for (i = 0; i < (boardCellsH * boardCellsW); i++) {
                    if (i === 10 || i === 11) {
                        tmp.push(new cells.Ship(cellW, cellH));
                    } else {
                        tmp.push(new cells.Water(cellW, cellH));
                    }
                }
                self.boardWidth = {
                    // * 2 because of border width
                    width: boardCellsW * cellW
                };
                self.cells = tmp;

            });
        }
    }

    @app.Directive
    export class GameBoardDirective implements appDirective{

        static $inject = [
            '$templateCache'
        ];

        static $componentName = 'gameBoard';

        public componentName;
        public $templateCache;

        public replace;
        public scope;
        public restrict;

        public controller;
        public controllerAs;
        public bindToController;

        constructor($templateCache: angular.ITemplateCacheService) {
            this.componentName = GameBoardDirective.$componentName;
            this.$templateCache = $templateCache;
            this.replace = true;
            this.scope = {};
            this.restrict = 'E';
            this.controller = GameBoardController;
            this.controllerAs = 'gameBoardCtrl';
            return this;
        }

        link = function(scope, element, attrs, controller, transcludeFn){

        };

        template = function(jqlite, attributes){
            return this.$templateCache.get('game/templates/game/index.html');
        };
    }
    angular.module(identifier, []);
}