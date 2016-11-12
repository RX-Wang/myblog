var express           = require('express');
var router            = express.Router();
var result            = require('../util/result');
var articleController = require('../controller/articles');

/* GET home page. */
router.get('/', articleController.index);

module.exports = router;
