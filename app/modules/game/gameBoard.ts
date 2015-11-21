/// <reference path="../../router.ts" />
module app.game{
    export var identifier:string = 'game';

    const ERROR_MEX1 = 'Ship Already placed!';
    const ERROR_MEX2 = 'Invalid position';

    class GameBoardController implements appComponent{
        public componentName;

        static $inject = [
            "dbConnectorService", "gameDbFactory", "toastr"
        ];

        private dbConnectorService;
        private gameDbFactory;
        public cells;
        public boardWidth;
        public ships;
        public columns : number;
        public selectedShip;
        public toastr;

        constructor(dbConnectorService, gameDbFactory, toastr) {
            this.componentName = 'gameBoardController';
            this.dbConnectorService = dbConnectorService;
            this.gameDbFactory = gameDbFactory;
            this.cells = [];
            this.boardWidth = {};
            this.ships = [];
            this.toastr = toastr;
            this.columns = 0;
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

            var tmpCells = [], tmpShips = [];
            var i;
            for (i = 0; i < (boardCellsH * boardCellsW); i++) {
                tmpCells.push(new cells.Water(cellW, cellH, i));
            }
            var i, l;
            for (i = 0, l = data.ships.length; i < l; i++) {
                tmpShips.push(new ships.Ship(data.ships[i].size, {
                    'line-height': cellH + 'px',
                    'border-radius': (cellH / 3)+ 'px',
                    height: cellH,
                    width: cellW * data.ships[i].size
                }, data.ships[i].name));
            }
            this.columns = boardCellsW;
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
            var tmpShips = this.ships,
                placed = false;
            this.selectedShip = false;
            if (tmpShips[index].placed) {
                this.selectedShip = false;
                placed = true;
            }
            if (typeof tmpShips[index] !== 'undefined') {
                var i, l;
                for (i = 0, l = tmpShips.length; i < l; i++) {
                    if (placed) {
                        tmpShips[i].active = false;
                    } else {
                        tmpShips[i].active = i === index && !tmpShips[i].active;
                    }
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
                var tmpCells = this.cells,
                    tempShip = this.ships[this.selectedShip];
                if (tempShip.placed) {
                    this.selectedShip = false;
                    tempShip.set('active', false);
                } else if (tmpCells[index] && tempShip) {
                    var attr = cell.getAttributes();
                    var i;
                    if (attr.cellName !== 'water') {
                        this.toastr.warning(ERROR_MEX2,' Warning');
                        return;
                    }
                    for (i = 0; i < tempShip.size; i++) {
                        if (!((index + i) % this.columns)) {
                            this.toastr.warning(ERROR_MEX2,' Warning');
                            return;
                        }
                    }
                    tempShip.set('placed', true);
                    tempShip.set('active', false);
                    for (i = 0; i < tempShip.size; i++) {
                        tmpCells[index + i] = new cells.Ship(attr.width, attr.height, attr.index);
                    }
                }
                this.ships[this.selectedShip] = tempShip;
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
            this.bindToController = true;
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