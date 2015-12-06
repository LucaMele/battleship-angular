/**
 * Created by Luca on 25.10.2015.
 */
module app.factoryService
{
    @app.Factory
    class FactoryService
    {
        static $inject = [];

        static $componentName = 'errorFactory';

        private errorMap;

        constructor(){
            this.errorMap = {
                error_code_1: 'user already on db',
                error_code_2: 'validation failed',
                error_code_3: 'something went wrong'
            };
            return this;
        }

        /**
         *
         * @param error_code
         * @returns {any}
         */
        public getError = function(error_code) {
            if (!this.errorMap[error_code]) {
                return false;
            }
            return this.errorMap[error_code];
        };
    }
}