module app.game.cells{
    export class WaterMarked extends app.game.cells.Cell implements cell{

        constructor(width : number, height : number, index: number) {
            super(height, width, index);
            // same as backend. keep attention when changing them
            this.cellName = 'water-marked';
            this.cellClassName = 'water-marked-cell';
        }
    }
}
