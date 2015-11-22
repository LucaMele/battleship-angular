module app.game.cells{
    export class Ship extends app.game.cells.Cell implements cell{
        constructor(width : number, height : number, index:number, pos:string, isHorizontal:boolean, size:number) {
            super(height, width, index);
            this.cellName = 'ship';
            console.log(size);
            console.log(size > 1 ? ((isHorizontal ? ' horizontal ' : ' vertical ') + pos) : ' single');
            this.cellClassName = 'ship-cell'+ (size > 1 ? ((isHorizontal ? ' horizontal ' : ' vertical ') + pos) : ' single');
        }
    }
}
