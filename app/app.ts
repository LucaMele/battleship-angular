/// <reference path="router.ts" />

module app {
    let angularModule = angular.module('app', [/*'ionic', */'ui.router', 'ngResource'], function() {

    });
    export function Config(clazz: any) {
        angularModule.config(clazz);
    }
    export function Run(clazz: any) {
        angularModule.run(clazz);
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
        angularModule.directive(clazz.$componentName, createArgs(clazz, arguments));
    }
    var createArgs = (clazz, classArgs) => {
        var args : any = [];
        args.push.apply(args, clazz.$inject);
        args.push(clazz);
        return args;
    };
}