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
            "$scope", '$state', "dbConnectorService", "gameDbFactory", "toastr", "userService", "$timeout"
        ];

        private dbConnectorService;
        private gameDbFactory;
        public cells;
        public boardWidth;
        public boardHeight;
        public isHorizontal;
        public ships;
        public isReady;
        public status_messages;
        public columns : number;
        public rows : number;
        public gameIsActive : boolean;
        public idleTurn : boolean;
        public gameStarted : boolean;
        public selectedShip;
        public game;
        public opponent;
        public lastHoveredCells;
        public status;
        public toastr;

        /**
         *
         * @param $scope
         * @param dbConnectorService
         * @param gameDbFactory
         * @param toastr
         * @param userService
         * @param $timeout
         */
        constructor($scope: angular.IScope, $state: angular.ui.IState,
                    dbConnectorService, gameDbFactory, toastr, userService, $timeout: angular.ITimeoutService) {
            this.componentName = 'gameBoardController';
            this.dbConnectorService = dbConnectorService;
            this.gameDbFactory = gameDbFactory;
            this.cells = [];
            this.boardWidth = {};
            this.boardHeight = {};
            this.ships = [];
            this.lastHoveredCells = [];
            this.selectedShip = false;
            this.status_messages = 'Loading data.. Please wait.';
            this.isReady = false;
            this.isHorizontal = true;
            this.opponent = '';
            this.gameIsActive = false;
            this.idleTurn = false;
            this.gameStarted = false;
            this.status = 'NEW';
            this.toastr = toastr;
            this.columns = 0;
            this.game = new game.manager.GameExecutionController($scope, $state, this, dbConnectorService, gameDbFactory, userService, $timeout);
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
                    this.opponent = data.opponent;
                    this.game.checkIdle(data);
                }
                if (data.status === 'IDLE') {
                    this.status_messages = "You have started a new game. Please wait for a random player to join..";
                    this.game.checkIdle(data);
                }
            } else {
                for (i = 0; i < (boardCellsH * boardCellsW); i++) {
                    tmpCells.push(new cells.Water(cellW, cellH, i));
                }
                this.status_messages = 'Game not started yet.\nSelect a orientation, either vertical or horizontal and then click on a ship to select it and on a free water cell to place it';
            }
            var i, l;
            for (i = 0, l = data.ships.length; i < l; i++) {
                newShip = new ships.Ship(data.ships[i].size, {
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
            this.boardHeight = {
                height: boardCellsH * cellH
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
                    if (!((index + i) % this.columns) && i !== 0) {
                        this.toastr.clear();
                        this.toastr.warning(ERROR_MEX2,' Warning');
                        return false;
                    }
                    // check if there is a ship on the right
                    if (tmpCells[index + i].cellName !== 'water') {
                        this.toastr.clear();
                        this.toastr.warning(ERROR_MEX1,' Warning');
                        return false;
                    }
                } else {
                    // check if there space under it
                    if (((index + i * this.columns) >= tmpCells.length)) {
                        this.toastr.clear();
                        this.toastr.warning(ERROR_MEX2,' Warning');
                        return false;
                    }
                    // check if there is a ship under it
                    if (tmpCells[index + i * this.columns] && tmpCells[index + i * this.columns].cellName !== 'water') {
                        this.toastr.clear();
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

        /**
         *
         * @param status
         * @returns {any}
         */
        public getStatusText = function(status) {
            switch (status) {
                case 'NEW': return STATUS_TEXT1;
                case 'IDLE': return STATUS_TEXT2;
                case 'READY': return STATUS_TEXT3 + this.opponent;
                default: return 'status error';
            }
        };

        /**
         *
         */
        public start = function() {
            if (!this.gameIsActive) {
                this.game.start(this.ships, this.cells);
            }
        };

        /**
         *
         */
        public checkIfThereAreFreeShips = function() {
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
        public onCellClick = function(cell, index) {
            if (this.idleTurn) {
                return;
            }
            if (this.gameStarted) {
                this.game.handleCellClick(cell, index);
                return;
            }
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
                        this.toastr.clear();
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
         * @param index
         */
        public checkShipPlacement = function(index) {
            var tempCell, i, l,
                tempShip = this.ships[this.selectedShip];
            if (this.idleTurn || this.gameStarted) {
                return;
            }
            if (this.selectedShip !== false) {
                for (i = 0, l = tempShip.size; i < l; i++) {
                    tempCell = null;
                    if (this.isHorizontal) {
                        if (this.cells[index + i] && (((index + i) % this.columns) || i === 0) && this.cells[index + i].cellName === 'water') {
                            tempCell = this.cells[index + i];
                        }
                    } else {
                        // check if there space under it
                        if (((index + i * this.columns) < this.cells.length)) {
                            tempCell = this.cells[index + i * this.columns];
                        }
                        // check if there is a ship under it
                        if (!this.cells[index + i] || this.cells[index + i * this.columns] && this.cells[index + i * this.columns].cellName !== 'water') {
                            tempCell = null;
                        }
                    }
                    if (tempCell && tempCell !== null) {
                        this.lastHoveredCells.push(tempCell);
                    }
                }
                if (this.lastHoveredCells.length === tempShip.size) {
                    for (i = 0, l = this.lastHoveredCells.length; i < l; i++) {
                        tempCell = this.lastHoveredCells[i];
                        tempCell.cellOrig = tempCell.cellClassName;
                        tempCell.cellClassName = tempCell.cellOrig + ' --hover';
                    }
                } else {
                    tempCell = this.cells[index];
                    tempCell.cellOrig = tempCell.cellClassName;
                    tempCell.cellClassName =  tempCell.cellClassName + ' --no-free';
                    this.lastHoveredCells = [];
                }
            }
        };

        /**
         *
         */
        public resetLastShip = function(index) {
            var i, l;
            if (this.idleTurn || this.gameStarted) {
                return;
            }
            if(this.lastHoveredCells.length) {
                for (i = 0, l = this.lastHoveredCells.length; i < l; i++) {
                    this.lastHoveredCells[i].cellClassName = this.lastHoveredCells[i].cellOrig;
                }
                this.lastHoveredCells = [];
            }
            if (this.cells[index].cellOrig) {
                this.cells[index].cellClassName = this.cells[index].cellOrig;
            }
        };


        /**
         *
         */
        public deleteGame = function() {
            this.game.deleteGame();
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