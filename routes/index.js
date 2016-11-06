var express = require('express');
var router = express.Router();
var ArticlesDao = require('../dao/articles');
var result      = require('../util/result');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user || null;
  ArticlesDao.list({}, function (err,data) {
    if(err){
      result.failse(500,{msg:err.message},res);
    }else{
      res.render('index', { title: 'Express' ,user:user,articles:data});
    }
  });

});

module.exports = router;
