module app.game.cells{
    export class Ship extends app.game.cells.Cell implements cell{
        constructor(width : number, height : number, index:number, pos:string, isHorizontal:boolean) {
            super(height, width, index);
            this.cellName = 'ship';
            this.cellClassName = 'ship-cell'+ (isHorizontal ? ' horizontal ' : ' vertical ') + pos ;
        }
    }
}
