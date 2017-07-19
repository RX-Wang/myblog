var express           = require('express');
var router            = express.Router();
var result            = require('../util/result');
var articleController = require('../controller/articles');

/* GET home page. */
router.get('/', articleController.index);
router.get('/qrimg', articleController.qrimg);
router.get('/create_qrcode', articleController.create_qrcode);
router.all('/row_scroll', articleController.row_scroll);//测试水平滚动
router.all('/touch', articleController.touch);//测试手机手势滑动



module.exports = router;
