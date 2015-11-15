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
        public ships;
        public selectedShip;

        constructor(dbConnectorService, gameDbFactory) {
            this.componentName = 'gameBoardController';
            this.dbConnectorService = dbConnectorService;
            this.gameDbFactory = gameDbFactory;
            this.cells = [];
            this.boardWidth = {};
            this.ships = [];
            this._getMap();
        }

        /**
         *
         * @param data
         */
        private _handleMap = function(data) {
            var boardCellsW = +data.w,
                boardCellsH = +data.h,
                cellW = +data.cell.w,
                cellH = +data.cell.h;
            var tmpCells = [], tmpShips = data.ships;
            var i;
            for (i = 0; i < (boardCellsH * boardCellsW); i++) {
                tmpCells.push(new cells.Water(cellW, cellH));
            }
            var i, l;
            for (i = 0, l = tmpShips.length; i < l; i++) {
                tmpShips[i].style = {
                    width: cellW * data.ships[i].size,
                    'line-height': cellH + 'px',
                    'border-radius': (cellH / 3)+ 'px',
                    height: cellH
                };
            }
            this.boardWidth = {
                width: boardCellsW * cellW
            };
            this.ships = tmpShips;
            this.cells = tmpCells;
        };

        /**
         *
         */
        private _getMap = function() {
            var self = this;
            this.dbConnectorService.connect(this.gameDbFactory.getGame(), {}, function(data) {
                self._handleMap.call(self, data);
            });
        };

        /**
         *
         * @param index
         */
        public selectShip = function (index) {
            var tmpShips = this.ships;
            this.selectedShip = false;
            if (typeof tmpShips[index] !== 'undefined') {
                var i, l;
                for (i = 0, l = tmpShips.length; i < l; i++) {
                    tmpShips[i].active = i === index && !tmpShips[i].active;
                    if (tmpShips[i].active) {
                        this.selectedShip = i;
                    }
                }
                this.ships = tmpShips;
            }
        };

        /**
         *
         * @param cell
         * @param index
         */
        public putShipOnCell = function(cell, index) {
            if (this.selectedShip !== false) {
                var tmpCells = this.cells;
                var tempShip = this.ships[this.selectedShip];
                if (tmpCells[index] && tempShip) {
                    var attr = cell.getAttributes();
                    var i;
                    for (i = 0; i < tempShip.size; i++) {
                        tmpCells[index + i] = new cells.Ship(attr.width, attr.height);
                    }
                }
            }
        };
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