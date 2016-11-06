/**
 * Created by RX-Wang on 2016/11/3.
 */
/**
 * Users-Dao
 * @type {{}}
 */
var UserModel = require('../../model/users');
var UsersDao = {};


/**
 * 注册
 */
UsersDao.register = function(params,cb){
    /*var name     = params.name;
    var uname    = params.uname;
    var pwd      = params.pwd;*/
    var user = new UserModel(params);
    user.save(params,function(err,data){
        if(err){
            cb(err,null);
        }else{
            cb(null,data);
        }
    });
};

/**
 * 登录
 * @param params
 * @param cb
 */
UsersDao.findOne = function(params,cb){
    UserModel.findOne(params,cb);
};

module.exports = UsersDao;