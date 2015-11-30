/// <reference path="router.ts" />

module app {
    /**
     *
     * @type {angular.IModule}
     */
    let angularModule = angular.module('app', ['ui.router', 'ngResource', 'toastr'], function() {});
    var modules = {};
    // decorator for angular config
    export function Config(clazz: any) {
        attachToModule(clazz).config(clazz);
    }
    // decorator for angular run
    export function Run(clazz: any) {
        attachToModule(clazz).run(clazz);
    }
    // decorator for angular controller
    export function Controller(clazz: any) {
        attachToModule(clazz).controller(clazz.$componentName, clazz);
    }
    // decorator for angular service
    export function Service(clazz: any) {
        attachToModule(clazz).service(clazz.$componentName, clazz);
    }
    // decorator for angular provider
    export function Provider(clazz: any) {
        attachToModule(clazz).provider(clazz.$componentName, clazz);
    }
    // decorator for angular factory
    export function Factory(clazz: any) {
        attachToModule(clazz).factory(clazz.$componentName, clazz);
    }
    // decorator for angular directive
    export function Directive(clazz: any) {
        attachToModule(clazz).directive(clazz.$componentName, createArgs(clazz, arguments));
    }

    /**
     *
     * @param clazz
     * @returns {angular.IModule}
     */
    var attachToModule = (clazz) => {
        if (clazz.$module) {
            if (!modules[clazz.$module]) {
                modules[clazz.$module] = angular.module('app.' + clazz.$module, ['ui.router']);
            }
            return modules[clazz.$module];
        }
        return angularModule;
    };

    /**
     *
     * @param clazz
     * @param classArgs
     * @returns {any}
     */
    var createArgs = (clazz, classArgs) => {
        var args : any = [];
        args.push.apply(args, clazz.$inject);
        args.push(clazz);
        return args;
    };
}