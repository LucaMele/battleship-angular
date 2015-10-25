/**
 * Created by Luca on 25.10.2015.
 */

var availableModules = require('../config').availableModules;
var dbObject = require('../services/db');
var assert = require('assert');

function modulesManager() {
    var self = this;

    var init = function() {
        var i, l, moduleName, Module;
        for (i = 0, l = availableModules.length; i < l; i++) {
            moduleName = availableModules[i];
            Module = require(__dirname + '/' + moduleName + '/index');

            self[moduleName] = new Module(dbObject.db, assert);
        }
    }();
    return self;
}

module.exports = modulesManager;