var express           = require('express');
var router            = express.Router();
var result            = require('../util/result');
var articleController = require('../controller/articles');

/* GET home page. */
router.get('/', articleController.index);
router.get('/qrimg', articleController.qrimg);
router.get('/create_qrcode', articleController.create_qrcode);

module.exports = router;
