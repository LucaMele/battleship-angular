/**
 * Created by Luca on 20.06.2015.
 */
var express = require('express');
var router = express.Router();
var ModulesManager = require('../modules/modulesManager.js');

var modules = new ModulesManager();

router.post("/login", modules.login.post);

module.exports = router;