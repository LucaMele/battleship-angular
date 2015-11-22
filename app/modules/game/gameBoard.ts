/// <reference path="../../router.ts" />
module app.game{
    export var identifier:string = 'game';

    const ERROR_MEX1 = 'Cell already occupied';
    const ERROR_MEX2 = 'Invalid position';

    const STATUS_TEXT1 = 'Start a new game!';
    const STATUS_TEXT2 = 'Waiting for someone to join';
    const STATUS_TEXT3 = 'Game started with ';

    @app.Controller
    export class GameBoardController implements appComponent{
        public componentName;

        static $inject = [
            "$scope", "dbConnectorService", "gameDbFactory", "toastr", "userService", "$timeout"
        ];

        private dbConnectorService;
        private gameDbFactory;
        public cells;
        public boardWidth;
        public isHorizontal;
        public ships;
        public isReady;
        public status_messages;
        public columns : number;
        public rows : number;
        public gameIsActive : boolean;
        public selectedShip;
        public game;
        public compeeter;
        public status;
        public toastr;

        constructor($scope, dbConnectorService, gameDbFactory, toastr, userService, $timeout) {
            this.componentName = 'gameBoardController';
            this.dbConnectorService = dbConnectorService;
            this.gameDbFactory = gameDbFactory;
            this.cells = [];
            this.boardWidth = {};
            this.ships = [];
            this.selectedShip = false;
            this.status_messages = 'Game not started yet';
            this.isReady = false;
            this.isHorizontal = true;
            this.compeeter = '';
            this.gameIsActive = false;
            this.status = 'NEW';
            this.toastr = toastr;
            this.columns = 0;
            this.game = new game.manager.GameExecutionController($scope, this, dbConnectorService, gameDbFactory, userService, $timeout);
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
                newShip,
                cellH = +data.cell.h,
                cellsSet = false,
                tmpCells = [], tmpShips = [];

            var i;
            if (data.cells) {
                cellsSet = true;
                tmpCells = data.cells;
                this.status = data.status;
                if (data.status === 'READY') {
                    this.compeeter = data.compeeter;
                }
                if (data.status === 'IDLE') {
                    this.game.checkIdle(data);
                }
            } else {
                for (i = 0; i < (boardCellsH * boardCellsW); i++) {
                    tmpCells.push(new cells.Water(cellW, cellH, i));
                }
            }
            var i, l;
            for (i = 0, l = data.ships.length; i < l; i++) {
                newShip = new ships.Ship(data.ships[i].size, {
                    'line-height': cellH + 'px',
                    'border-radius': (cellH / 3)+ 'px',
                    height: cellH,
                    width: cellW * data.ships[i].size
                }, data.ships[i].name);
                if (cellsSet) {
                    newShip.set('placed', true);
                    newShip.set('active', false);
                    this.gameIsActive = true;
                }
                tmpShips.push(newShip);
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
            var i, pos;
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
                pos = i === 0 ? 'first' : 'middle';
                pos = i === tempShip.size-1 ? 'last' : pos;
                if (this.isHorizontal) {
                    tmpCells[index + i] = new cells.Ship(attr.width, attr.height, attr.index, pos, this.isHorizontal, tempShip.size);
                } else {
                    tmpCells[index + i * this.columns] = new cells.Ship(attr.width, attr.height, attr.index, pos, this.isHorizontal, tempShip.size);
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

        getStatusText = function(status) {
            switch (status) {
                case 'NEW': return STATUS_TEXT1;
                case 'IDLE': return STATUS_TEXT2;
                case 'READY': this.status_messages = 'Setting things up..'; return STATUS_TEXT3 + this.compeeter;
                default: return 'status error';
            }
        };

        /**
         *
         */
        start = function() {
            if (!this.gameIsActive) {
                this.game.start(this.ships, this.cells);
            }
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