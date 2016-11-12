/**
 * Created by RX-Wang on 2016/11/2.
 */

/**
 * ArticlesDao
 * @type {*|exports|module.exports}
 */
    
var articleModel     = require('../../model/articles');
var articleTypeModel = require('../../model/articleType');
    
var ArticlesDao = {};

/**
 * 文章列表（根据文章类型，没有传参的话就默认查询全部的）
 * @param req
 * @param res
 * @param limit: 查询条数：number
 * @param sort   排序条件：object
 * @returns {String}
 */
ArticlesDao.list = function(params,limit,sort,cb){
    articleModel.find(params).limit(limit).sort(sort).exec(cb);
};


/**
 * 文章详情
 * @param req
 * @param res
 * @returns {String}
 */
ArticlesDao.detail = function(params,cb){
    articleModel.findOne(params,cb);
};

/**
 * 添加文章
 * @param req
 * @param res
 * @returns {String}
 */
ArticlesDao.add = function(params,cb){
    var article = new articleModel(params);
    article.save(cb);
};

/**
 * 编辑文章
 * @param req
 * @param res
 * @returns {String}
 */
ArticlesDao.edit = function(params,cb){

};

/**
 * 文章类型列表（根据名称查，如果名称参数没有，就列举所有的）
 * @param req
 * @param res
 * @returns {String}
 */
ArticlesDao.typeList = function(params,cb){
    articleTypeModel.find(params,cb);
};



/**
 * 添加文章类型
 * @param req
 * @param res
 * @returns {String}
 */
ArticlesDao.addType = function(params,cb){
    var articleType = new articleTypeModel(params);
    articleType.save(cb);
};


module.exports = ArticlesDao;