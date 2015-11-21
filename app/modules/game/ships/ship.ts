module app.game.ships{
    export class Ship implements ship{

        public name: string;
        public style: any;
        public size: number;

        /**
         *
         * @param style
         * @param size
         * @param name
         */
        constructor(size: number, style: any, name: string) {
            this.style = style;
            this.name = name;
            this.size = size;
        }

        /**
         *
         * @returns {{style: (any|*|boolean|string|MSStyleCSSProperties|CSSStyleDeclaration), name: any, size: (any|number|app.game.ships.Ship.size)}}
         */
        getAttributes = function(){
            return {
                style: this.style,
                name: this.name,
                size: this.size
            };
        };

        /**
         *
         * @param key
         * @param value
         */
        set (key, value) {
            this[key] = value;
        }
    }
}
