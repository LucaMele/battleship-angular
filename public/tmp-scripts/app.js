/// <reference path="router.ts" />
var app;
(function (app) {
    var angularModule = angular.module('app', ['ionic', 'ui.router', 'ngResource'], function () {
    });
    function Config(clazz) {
        angularModule.config(clazz);
    }
    app.Config = Config;
    function Run(clazz) {
        angularModule.run(clazz);
    }
    app.Run = Run;
    function Controller(clazz) {
        angularModule.controller(clazz.$componentName, clazz);
    }
    app.Controller = Controller;
    function Service(clazz) {
        angularModule.service(clazz.$componentName, clazz);
    }
    app.Service = Service;
    function Provider(clazz) {
        angularModule.provider(clazz.$componentName, clazz);
    }
    app.Provider = Provider;
    function Factory(clazz) {
        angularModule.factory(clazz.$componentName, clazz);
    }
    app.Factory = Factory;
    function Directive(clazz) {
        angularModule.directive(clazz.$componentName, createArgs(clazz, arguments));
    }
    app.Directive = Directive;
    var createArgs = function (clazz, classArgs) {
        var args = [];
        args.push.apply(args, clazz.$inject);
        args.push(clazz);
        return args;
    };
})(app || (app = {}));
