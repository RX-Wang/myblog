/**
 * Created by RX-Wang on 2016/11/3.
 */
/**
 * Users-Controller
 * @type {{}}
 */
var UsersDao = require('../../dao/users');
var result   = require('../../util/result');
var Q        = require('q');
var async    = require('async');
var Users    = {};

/**
 * 跳转至登录页面
 */
Users.toLoginOrRegister = function(req,res){
    var originalUrl = req.query.originalUrl || req.body.originalUrl || req.params.originalUrl || null;
    return res.render('users/loginOrRegister',{originalUrl:originalUrl});
};

/**
 * 登录
 */
Users.login = function(req,res){
    var uname           = req.query.uname || req.body.uname || req.params.uname || null;
    var pwd             = req.query.pwd || req.body.pwd || req.params.pwd || null;
    var originalUrl     = req.query.originalUrl || req.body.originalUrl || req.params.originalUrl || null;
    if(!originalUrl){
        originalUrl = '/';
    }
    UsersDao.findOne({
        uname:uname,
        pwd  : pwd
    },function(err,data){
        if(err){
            return result.failse(500,err,res);
        }else if(data){
            req.session.user = data;
            return result.success({user:data,originalUrl:originalUrl},res);
        }else{
            return result.failse(404,{msg:'用户名或密码错误'},res);
        }
    });
};

/**
 * 判断用户登录是否有效
 */
Users.checkUser = function(req,res,next){
    var uname = req.session.user ? req.session.user.uname : null;
    var originalUrl = req.originalUrl;
    if(uname){
        next();
    }else{
        res.redirect('/users/toLoginOrRegister?originalUrl=' + originalUrl);
    }
};



/**
 * 跳转到注册页面
 */
Users.toRegisterPage = function(req,res){
    res.render('users/registerPage');
};

/**
 * 注册
 */
Users.register = function(req,res){
    var name     = req.query.name || req.body.name || req.params.name || null;
    var uname    = req.query.uname || req.body.uname || req.params.uname || null;
    var pwd      = req.query.pwd || req.body.pwd || req.params.pwd || null;
    var originalUrl = '/users/toLoginOrRegister';
    async.waterfall([
        function(cb){
            UsersDao.findOne({
                uname : uname
            },cb)
        },
        function(data,cb){
            if(data){
                cb(null,{msg:'用户名已存在'});
            }else{
                UsersDao.register({
                    name : name,
                    uname : uname,
                    pwd   : pwd
                },cb);
            }
        }


    ],function(err,results){
        if(err){
            return result.failse(500,{data:err},res);
        }else if(results.msg){
            return result.failse(500,{msg:results.msg},res);
        }else{
            return result.success({originalUrl:originalUrl,},res);
        }
    });
   /* /!**
     * 检查用户名是否重复
     * @param uname
     *!/
    var checkUname = function(uname){
        var deferred = Q.defer();
        UsersDao.findOne({
            uname : uname
        },function(err,data){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(data);
            }
            return deferred.promise;
        });
    };
    /!**
     * 注册
     * @param data
     *!/
    var regist     = function(data){
        var deferred = Q.defer();
        if(data){

        }else{
            UsersDao.register({
                name : name,
                uname : uname,
                pwd   : pwd
            },function(err,data){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(data);
                }
                return deferred.promise;
            });
        }
    };

    var main = function(uname,cb){
        checkUname(uname)
            .then(regist)
            .done(function(data){
                cb(null,data);
            },function(err){
                cb(err,null);
            });
    };
    main(uname,function(err,data){
        if(err){
            console.log(err.message);
        }else{
            console.log(data);
            return result.success({originalUrl:originalUrl},res);
        }
    });*/

};

/**
 * 退出登录
 * @type {{}}
 */

Users.loginout = function(req,res){
    delete req.session.user;
    return res.redirect('/');
};

module.exports = Users;