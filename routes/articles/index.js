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
 * 跳转到添加文章页面
 */
router.all('/toAddArticlePage',UsersController.checkUser,ArticlesController.toAddArticlePage);

/**
 * 添加文章
 */
router.all('/addArticle',UsersController.checkUser,ArticlesController.addArticle);

/**
 * 文章详情
 */
router.all('/articleDetail/:id',UsersController.checkUser,ArticlesController.detail);

/**
 * 跳转到我的文章列表页面并加载列表
 */
router.all('/myArticles',UsersController.checkUser,ArticlesController.myArticles);

/**
 * 假删除，放在回收站
 */
router.all('/deleteArticle',UsersController.checkUser,ArticlesController.myArticles);

/**
 *
 */
//router.all('/myArticles',UsersController.checkUser,ArticlesController.myArticles);

module.exports = router;