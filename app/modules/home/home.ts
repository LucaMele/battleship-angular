/**
 * Created by Luca on 03.10.2015.
 */
module home{
    export var identifier:string = 'home';

    @app.Controller
    class HomeController implements appComponent{
        public componentName;

        constructor(public $scope: angular.IScope) {
            this.componentName = identifier;
            $scope['test'] = 'i come from the angular controller';
        }

    }


}