module app.game.cells{
    export class Cell implements cell{

        public width;
        public cellName;
        public height;
        public cellStyle;
        public cellClassName;

        constructor(width: number, height: number) {
            this.width = width;
            this.height = height;
            this.cellName = 'generic';
            this.cellClassName = 'generic-cell';
            this.cellStyle = {
                width: width,
                height: height
            };
        }

        /**
         *
         * @returns {{width: any, height: any, cellStyle: (any|*|{width: number, height: number})}}
         */
        getAttributes = function(){
            return {
                width: this.width,
                height: this.height,
                cellStyle: this.cellStyle
            }
        }
    }
}
