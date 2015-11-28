module app.game.cells{
    export class ShipMarked extends app.game.cells.Cell implements cell{

        constructor(width : number, height : number, index: number) {
            super(height, width, index);
            // same as backend. keep attention when changing them
            this.cellName = 'ship-marked';
            this.cellClassName = 'ship-marked-cell';
        }
    }
}
