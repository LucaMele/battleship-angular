/// <reference path="../../router.ts" />
module app.game{
    export var identifier:string = 'game';

    const ERROR_MEX1 = 'Cell already occupied';
    const ERROR_MEX2 = 'Invalid position';

    @app.Controller
    export class GameBoardController implements appComponent{
        public componentName;

        static $inject = [
            "dbConnectorService", "gameDbFactory", "toastr"
        ];

        private dbConnectorService;
        private gameDbFactory;
        public cells;
        public boardWidth;
        public isHorizontal;
        public ships;
        public isReady;
        public columns : number;
        public rows : number;
        public selectedShip;
        public game;
        public toastr;

        constructor(dbConnectorService, gameDbFactory, toastr) {
            this.componentName = 'gameBoardController';
            this.dbConnectorService = dbConnectorService;
            this.gameDbFactory = gameDbFactory;
            this.cells = [];
            this.boardWidth = {};
            this.ships = [];
            this.selectedShip = false;
            this.isReady = false;
            this.isHorizontal = true;
            this.toastr = toastr;
            this.columns = 0;
            this.game = new GameExecutionController();
            this.rows = 0;
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
            this.rows = boardCellsH;
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
         * @param tempShip
         * @param attr
         * @param tmpCells
         * @param index
         * @returns {any}
         * @private
         */
        private _putOnMap = function(tempShip, attr, tmpCells, index) {
            var i;
            for (i = 0; i < tempShip.size; i++) {
                if (this.isHorizontal) {
                    // check if is space on the right
                    if (!((index + i) % this.columns)) {
                        this.toastr.warning(ERROR_MEX2,' Warning');
                        return false;
                    }
                    // check if there is a ship on the right
                    if (tmpCells[index + i].cellName !== 'water') {
                        this.toastr.warning(ERROR_MEX1,' Warning');
                        return false;
                    }
                } else {
                    // check if there space under it
                    if (((index + i * this.columns) > tmpCells.length)) {
                        this.toastr.warning(ERROR_MEX2,' Warning');
                        return false;
                    }
                    // check if there is a ship under it
                    if (tmpCells[index + i * this.columns] && tmpCells[index + i * this.columns].cellName !== 'water') {
                        this.toastr.warning(ERROR_MEX1,' Warning');
                        return false;
                    }
                }
            }
            tempShip.set('placed', true);
            tempShip.set('active', false);
            for (i = 0; i < tempShip.size; i++) {
                if (this.isHorizontal) {
                    tmpCells[index + i] = new cells.Ship(attr.width, attr.height, attr.index);
                } else {
                    tmpCells[index + i * this.columns] = new cells.Ship(attr.width, attr.height, attr.index);
                }
            }
            return tempShip;
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
         */
        start = function() {
            this.game.start(this.ships, this.cells);
        };

        /**
         *
         */
        checkIfThereAreFreeShips = function() {
            var i, l, allPlaced = true;
            for(i = 0, l = this.ships.length; i < l; i++) {
                if (!this.ships[i].placed) {
                    allPlaced = false;
                    break;
                }
            }
            if (allPlaced) {
                this.isReady = true;
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
                    tempShip = this._putOnMap(tempShip, attr, tmpCells, index);
                    if (!tempShip) {
                        return;
                    }
                }
                this.checkIfThereAreFreeShips();
                this.ships[this.selectedShip] = tempShip;
            }
        };

        /**
         *
         * @param orientation
         */
        public changeOrientation = function(orientation) {
            this.isHorizontal = orientation === 'horizontal';
        };
    }
}