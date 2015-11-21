/**
 * Created by Luca on 04.10.2015.
 */

interface appComponent {
    componentName: string;
}

interface cell {
    width: number;
    height: number;
    index: number;
    cellStyle: any;
    cellClassName: string;
    getAttributes();
}

interface ship {
    name: string;
    size: number;
    style: any;
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