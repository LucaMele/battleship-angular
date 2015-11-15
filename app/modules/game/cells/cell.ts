module app.game.cells{
    export class Cell implements cell{

        public width;
        public cellName;
        public height;
        public cellStyle;

        constructor(width: number, height: number) {
            this.width = width;
            this.height = height;
            this.cellName = 'generic';
            this.cellStyle = {
                width: width,
                height: height
            };
        }
    }
}
