/**
 * Created by Luca on 04.10.2015.
 */

interface appComponent {
    componentName: string;
}

interface cell {
    width: number;
    height: number;
    cellStyle: any;
}

interface appDirective {
    componentName: string;
    restrict: string;
    replace: boolean;
    template: any;
}

interface IStateProvider extends angular.ui.IStateProvider {
    state(config: any): IStateProvider;
    state(name: string, config: any): IStateProvider;
}