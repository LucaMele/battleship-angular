module app.game.cells{
    export class Water extends app.game.cells.Cell implements cell{

        /**
         *
         * @param width
         * @param height
         * @param index
         */
        constructor(width : number, height : number, index: number) {
            super(height, width, index);
            // same as backend. keep attention when changing them
            this.cellName = 'water';
            this.cellClassName = 'water-cell';
        }
    }
}
