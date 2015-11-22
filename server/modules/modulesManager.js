/**
 * Created by Luca on 25.10.2015.
 */

var availableModules = require('../config').availableModules;
var dbObject = require('../services/db');
var assert = require('assert');
var express = require('express');

var app = express();

function modulesManager() {

    var self = this;

    /**
     *
     * @param auth
     * @param accessLevels
     * @param req
     * @param res
     * @param callback
     */
    var checkAuth = function(auth, accessLevels, req, res, callback) {
        var cursor = dbObject.db.collection('users').find({key: auth}).limit(1);
        cursor.count(function(err, count) {
            assert.equal(null, err);
            if (count === 0) {
                res.status(401).send({ error: 'unauthorized!' });
            } else {
                cursor.forEach(function(doc){
                    var roles = doc.roles;
                    var i, l;
                    for (i = 0, l = roles.length; i < l; i++) {
                        if (accessLevels.indexOf(roles[i]) > -1) {
                            callback(doc.username);
                            return;
                        }
                    }
                    res.status(403).send({ error: 'not enough access permissions!' });
                });
            }
        });
    };

    var init = function() {
        var i, l, moduleName, Module;
        for (i = 0, l = availableModules.length; i < l; i++) {
            moduleName = availableModules[i];
            Module = require(__dirname + '/' + moduleName + '/index');
            self[moduleName] = new Module(dbObject.db, assert);
        }
    }();

    this.exec = function(moduleString, method, req, res) {
        var module = this[moduleString];
        if (typeof module !== 'undefined') {
            var config = require(__dirname + '/' + moduleString + '/config');
            if (config.accessLevels && config.accessLevels.indexOf('guest') !== -1) {
                if (module[method]) {
                    module[method](req, res);
                }
            } else if (config.accessLevels) {
                checkAuth(req.headers.authorization, config.accessLevels, req, res, function(username){
                        module[method](req, res, username);
                    }
                );
            }
        }
    };

    return self;
}



module.exports = modulesManager;