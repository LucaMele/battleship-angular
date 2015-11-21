module app.game.cells{
    export class Water extends app.game.cells.Cell implements cell{

        constructor(width : number, height : number, index: number) {
            super(height, width, index);
            this.cellName = 'water';
            this.cellClassName = 'water-cell';
        }
    }
}
