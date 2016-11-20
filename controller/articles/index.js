/**
 * Created by RX-Wang on 2016/11/2.
 */

/**
 * Articles-Controller
 * @type {*|exports|module.exports}
 */
var ArticlesDao = require('../../dao/articles');
var UsersDao     = require('../../dao/users');
var async       = require('async');
var result      = require('../../util/result');
var Articles    = {};
var Promise     = require('bluebird');
var moment      = require('moment');

/**
 * 网站首页 相关加载信息，查询文章列表
 * @param req
 * @param res
 */
Articles.index = function(req,res){
    var user = req.session.user || null;
    ArticlesDao.list({},20,{'createDate':-1}, function (err,data) {
        if(err){
            result.failse(500,{msg:err.message},res);
        }else{
            res.render('index', { title: 'Express' /*,user:user*/,articles:data});
        }
    });
};

/**
 * 文章详情
 * @param req
 * @param res
 * @returns {String}
 */
Articles.detail = function(req,res){
    var id   = req.query.id || req.body.id || req.params.id || null;
    var user = req.session.user;
    var getArticle = function(id){
        return new Promise(
            function(resolve,reject){
                ArticlesDao.detail({
                    _id:id
                },function(err,data){
                    if(err){
                        reject(err);
                    }else if(!data){
                        reject(new Error('404'));
                    }else {
                        /*var d = new Date(data.createDate);
                        var dd = d.toLocaleDateString();
                        var ddd = moment(data.createDate).format('YYYY-MM-DD');*/
                        delete data.createDate;
                        data.createDate = moment(data.createDate).format('YYYY-MM-DD');
                        resolve(data);
                    }
                });
            }
        );
    };
    var getUser = function(data){
      return new Promise(function(resolve,reject){
          UsersDao.findOne({_id:data.authorID},function(err,user){
              if(err){
                  reject(err);
              }else if(!user){
                  reject(new Error('404'));
              }else{
                  data.user = user;
                  resolve(data);
              }
          })
      });
    };
    getArticle(id)
        .then(function(article){
            return getUser(article);
        })
        .then(function(articleAndUser){
            return res.render('articles',{
                data:articleAndUser,
                user:user
            });
        })
        .catch(function(err){
            if(err.message == '404'){
                console.error(err.message);
                return res.render('404_3',{msg:'没有此文章'});
            }
        });

    /*ArticlesDao.detail({
        _id:id
    },function(err,data){
        if(err){
            console.log(err.message);
        }else{
            //console.log(data);
            return res.render('articles',{
                data:data,
                user:user
            });
        }
    });*/
};

/**
 * 跳转到添加文章页面(用于添加和编辑)
 * @param req
 * @param res
 * @returns {String}
 */
Articles.toAddArticlePage = function(req,res){
    var user = req.session.user;
    var id = req.params.id || null;     //文章ID
    async.parallel({
        articleType : function(cb){
            //获取已有的文章类型
            ArticlesDao.typeList({},function(err,data){
                if(err){
                    cb(err,null);
                }else{
                    cb(null,data);
                }
            });
        },
        //如果是编辑文章，则获取当前文章
        article     : function(cb){
            if(id){
                ArticlesDao.detail({
                    _id:id
                },function(err,data){
                    if(err){
                        cb(err,null);
                    }else if(!data){
                        cb(new Error('404'),null);
                    }else {
                        var d = new Date(data.createDate);
                        data.createDate = moment(d).format('YYYY-MM-DD');
                        cb(null,data);
                    }
                });
            }else{
                cb(null,null);
            }
        }
    },function(err,results){
        if(err){
            return res.render('error',{error:err});
        }else{
            return res.render('articles/addArticles',{
                articleType : results.articleType,
                article     : results.article
            });
        }
    });
};

/**
 * 添加文章
 * @param req
 * @param res
 * @returns {String}
 */
Articles.addArticle = function(req,res){
    var articleId   = req.query.articleId || req.body.articleId || req.params.articleId || null;
    var title       = req.query.title || req.body.title || req.params.title || null;
    var intro       = req.query.intro || req.body.intro || req.params.intro || null;
    var type        = req.query.type || req.body.type || req.params.type || null;
    var content     = req.query.content || req.body.content || req.params.content || null;
    var typeSelect  = req.query.typeSelect || req.body.typeSelect || req.params.typeSelect || null;
    var typeInput   = req.query.typeInput || req.body.typeInput || req.params.typeInput || null;
    var authorID    = req.session.user._id;
    var createDate  = new Date();
    if( typeSelect && typeInput){
        return result.failse(500,{msg:'参数错误，不能同时录入选择的文章类型和输入的文章类型'},res);
    }
    /**
     *
     * @param typeID：如果是手动输入的 类型名称，则该参数是保存新类型以后的类型ID
     */
    var addArticle = function( typeID){
        if(articleId){
            ArticlesDao.edit(articleId,{
                title       : title,
                intro       : intro,
                type        : typeSelect ? typeSelect : typeID ,
                content     : content
            }, function(err,data){
                if(err){
                    return result.failse(500,{msg:err.message},res);
                }else{
                    return result.success({code:200},res);
                }
            });
        }else{
            ArticlesDao.add(
                {
                    title       : title,
                    intro       : intro,
                    type        : typeSelect ? typeSelect : typeID ,
                    content     : content,
                    authorID    : authorID,
                    createDate  : createDate
                },function(err,data){
                    if(err){
                        return result.failse(500,{msg:err.message},res);
                    }else{
                        return result.success({code:200},res);
                    }
                });
        }
    };
    //如果是手动输入的文章类型，则先查询是否已存在，不存在则保存新类型，然后保存文章。
    if(typeInput){
        async.waterfall([
            function(cb){
                ArticlesDao.typeList({
                    name:type
                },cb);
            },
            function(data,cb){
                if(data.length){
                    cb(new Error('类型已存在'),{})
                }else{
                    ArticlesDao.addType({
                        name : type
                    },cb);
                }
            },
            function(data,cb){
                if(data){
                    addArticle(data.id);
                }else{
                    cb(null,{msg:'类型已存在'});
                }
            }
        ],function(err,results){
            if(err){
                return result.failse(500,{msg:err.message},res);
            }else if(results.msg){
                return result.failse(500,{msg:results.msg},res);
            }else{
                return result.success({code:200},res);
            }
        });
    }else{
        addArticle();
    }
};

/**
 * 我的文章列表
 * @param req
 * @param res
 */
Articles.myArticles = function(req,res){
    var authorID = req.session.user._id;
    ArticlesDao.myArticles({authorID:authorID},function(err,data){
        if(err){
            res.render('error',{error:err});
        }else{
            res.render('articles/myArticles',{articles:data});
        }
    });
};

module.exports = Articles;