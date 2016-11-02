/**
 * Created by RX-Wang on 2016/11/2.
 */
var express = require('express');
var router  = express.Router();
var Articles = require('../../controller/articles');

router.get('/:id',Articles.detail);

module.exports = router;