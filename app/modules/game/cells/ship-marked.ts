module app.game.cells{
    export class ShipMarked extends app.game.cells.Cell implements cell{

        /**
         *
         * @param width
         * @param height
         * @param index
         * @param pos
         * @param isHorizontal
         * @param size
         */
        constructor(width : number, height : number, index: number, pos:string, isHorizontal:boolean, size:number) {
            super(height, width, index);
            // same as backend. keep attention when changing them
            this.cellName = 'ship-marked';
            // same as backend, keep attention
            this.cellClassName = 'ship-marked-cell' + (isHorizontal ? ' horizontal ' : ' vertical ') + (size > 1 ? (pos) : ' single');
        }
    }
}
