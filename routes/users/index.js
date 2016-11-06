/**
 * Created by RX-Wang on 2016/11/2.
 */
var express = require('express');
var router = express.Router();
var UserController = require('../../controller/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


/**
 * 跳转至登录/注册页
 */
router.all('/toLoginOrRegister',UserController.toLoginOrRegister);
/**
 * 登录
 */
router.all('/login',UserController.login);
/**
 * 验证 session是否失效
 */
router.all('/checkUser',UserController.checkUser,function(req,res){});

/**
 * 跳转至注册页
 */
router.all('/toRegister',UserController.toRegisterPage);
/**
 * 注册
 */
router.all('/register',UserController.register);

/**
 * 退出登录
 */
router.all('/loginout',UserController.loginout);
module.exports = router;
