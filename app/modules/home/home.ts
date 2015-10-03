/**
 * Created by Luca on 03.10.2015.
 */
module home{

    @app.Controller
    class ngHomeController {

        constructor(public $scope: angular.IScope) {
            $scope['test'] = 'i come from the angular controller';
        }

    }

}