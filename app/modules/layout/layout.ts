/**
 * Created by Ricardo on 08/11/15.
 */
/// <reference path="../../router.ts" />
module app.layout{
    export var identifier:string = 'layout';

    @app.Directive
    export class LayoutDirective implements appComponent{

        static $inject = [
        ];
        static $componentName = 'layout';
        public componentName;

        constructor() {
            this.componentName = LayoutDirective.$componentName;
            return this;
        }

        public template = 'Ricardo';

        public restrict = 'E';

        /**
         *
         * @param data
         */

    }
}