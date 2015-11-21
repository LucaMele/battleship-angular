module app.game.cells{
    export class Ship extends app.game.cells.Cell implements cell{

        constructor(width : number, height : number, index:number) {
            super(height, width, index);
            this.cellName = 'ship';
            this.cellClassName = 'ship-cell';
        }
    }
}
