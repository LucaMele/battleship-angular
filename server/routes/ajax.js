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
router.post("/register", function(req, res) {
    modules.exec('register', 'post', req, res);
});
router.get("/home", function(req, res) {
    modules.exec('home', 'get', req, res);
});
router.get("/users/list", function(req, res) {
    modules.exec('usersList', 'get', req, res);
});
router.delete("/user/delete/:id", function(req, res) {
    modules.exec('user', 'delete', req, res);
});
router.post("/user", function(req, res) {
    modules.exec('user', 'post', req, res);
});
router.get("/game", function(req, res) {
    modules.exec('game', 'get', req, res);
});
router.get("/maps/:id", function(req, res) {
    modules.exec('game', 'getMaps', req, res);
});
router.post("/game/ready", function(req, res) {
    modules.exec('game', 'post', req, res);
});
router.post("/map/mark", function(req, res) {
    modules.exec('game', 'setMark', req, res);
});
router.get("/game/:id", function(req, res) {
    modules.exec('game', 'getGame', req, res);
});
router.delete("/game/:id", function(req, res) {
    modules.exec('game', 'deleteGame', req, res);
});
router.put("/game/:id", function(req, res) {
    modules.exec('game', 'updateGame', req, res);
});

module.exports = router;