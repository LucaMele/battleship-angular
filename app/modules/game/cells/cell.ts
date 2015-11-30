module app.game.cells{
    export class Cell implements cell{

        public width;
        public index;
        public cellName;
        public height;
        public cellStyle;
        public cellClassName;

        /**
         *
         * @param width
         * @param height
         * @param index
         */
        constructor(width: number, height: number, index: number) {
            this.width = width;
            this.index = index;
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
         * @returns {{width: any, index: (any|number|function(string): IDBIndex|function(): number|function((string|JQuery|Element)): number|app.game.cells.Cell.index), height: any, cellName: (any|string|string|string), cellStyle: (any|*|{width: number, height: number})}}
         */
        public getAttributes = function(){
            return {
                width: this.width,
                index: this.index,
                height: this.height,
                cellName: this.cellName,
                cellStyle: this.cellStyle
            }
        }
    }
}
