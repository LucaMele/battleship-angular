/**
 * Created by Luca on 20.06.2015.
 */
var express = require('express');
var router = express.Router();
var ModulesManager = require('../modules/modulesManager.js');

var modules = new ModulesManager();

router.post("/login", function(req, res) {
    modules.exec('login', 'post', req, res);
});
router.get("/home", function(req, res) {
    modules.exec('home', 'get', req, res);
});
router.get("/users/list", function(req, res) {
    modules.exec('usersList', 'get', req, res);
});
router.post("/user", function(req, res) {
    modules.exec('user', 'post', req, res);
});
router.get("/game", function(req, res) {
    modules.exec('game', 'get', req, res);
});

module.exports = router;