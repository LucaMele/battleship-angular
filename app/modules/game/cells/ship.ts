module app.game.cells{
    export class Ship extends app.game.cells.Cell implements cell{
        constructor(width : number, height : number, index:number, pos:string, isHorizontal:boolean, size:number) {
            super(height, width, index);
            this.cellName = 'ship';
            this.cellClassName = 'ship-cell' + (isHorizontal ? ' horizontal ' : ' vertical ') + (size > 1 ? (pos) : ' single');
        }
    }
}
