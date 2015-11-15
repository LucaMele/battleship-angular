module app.game.cells{
    export class Ship extends app.game.cells.Cell implements cell{

        constructor(width : number, height : number) {
            super(height, width);
            this.cellName = 'ship';
            this.cellClassName = 'ship-cell';
        }
    }
}
