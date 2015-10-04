module app {
    let angularModule = angular.module('app', ['ui.router']);
    export function Config(clazz: any) {
        angularModule.config(new clazz().dependencies);
    }
    export function Controller(clazz: any) {
        angularModule.controller(clazz.$componentName, clazz);
    }
    export function Service(clazz: any) {
        angularModule.service(clazz.$componentName, clazz);
    }
    export function Provider(clazz: any) {
        angularModule.provider(clazz.$componentName, clazz);
    }
    export function Factory(clazz: any) {
        angularModule.factory(clazz.$componentName, clazz);
    }
    export function Directive(clazz: any) {
        var args = [];
        args.push.apply(args, clazz.$inject);
        args.push(function() { return new clazz(arguments) });
        angularModule.directive(clazz.$componentName, args);
    }
}