/**
 * Created by Luca on 04.10.2015.
 */
interface AngularConfig {
    callback(...args: any[]): any;
    dependencies: Object;
}

interface appComponent {
    componentName: string;
}

interface IStateProvider extends angular.ui.IStateProvider {
    state(config: any): IStateProvider;
    state(name: string, config: any): IStateProvider;
}