/**
 * Created by RX-Wang on 2016/11/3.
 */

var mongoose = require('mongoose');
var mongo = {
    "hostname": "127.0.0.1" ,
        "port"    : 27017 ,
        "username": "myblog" ,//暂时本地测试,
        "password": "myblog" ,
        "name"    : "" ,
        "db"      : "myblog"//数据库名称
};
var config = {
    connection : (
        mongo.username && mongo.password
    )?
    'mongodb://' + mongo.username+":" + mongo.password + "@"+mongo.hostname + ':' + mongo.port +  '/' + mongo.db
        :
    'mongodb://' + mongo.hostname + ':' + mongo.port +  '/' + mongo.db,
    connect    : function(){
        mongoose.connect(this.connection,function(err,data){
            if(err){
                console.error('连接 mongodb 失败:' + err.message);
            } else{
                console.log('连接 mongodb 成功:' + config.connection);
            }
        });
    }
};

module.exports = config;
