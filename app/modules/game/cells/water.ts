module app.game.cells{
    export class Water extends app.game.cells.Cell implements cell{

        constructor(width : number, height : number) {
            super(height, width);
            this.cellName = 'water';
            this.cellClassName = 'water-cell';
        }
    }
}
