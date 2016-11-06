/**
 * Created by RX-Wang on 2016/11/2.
 */

/**
 *  Articles-Rounter
 * @type {*|exports|module.exports}
 */
var express = require('express');
var router  = express.Router();
var ArticlesController = require('../../controller/articles');
var UsersController    = require('../../controller/users');



/**
 * 添加文章
 */
router.all('/addArticle',UsersController.checkUser,ArticlesController.addArticle);

/**
 * 跳转到添加文章页面
 */
router.all('/toAddArticlePage',UsersController.checkUser,ArticlesController.toAddArticlePage);





/**
 * 文章详情
 */
router.all('/:id',UsersController.checkUser,ArticlesController.detail);

module.exports = router;