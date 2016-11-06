/**
 * Created by RX-Wang on 2016/11/3.
 */

var mongoose = require('mongoose');
var mongo = {
    "hostname": "127.0.0.1" ,
        "port"    : 27017 ,
        "username": "" ,//暂时本地测试,
        "password": "" ,
        "name"    : "" ,
        "db"      : "myblog"//数据库名称
};
var config = {
    connection : 'mongodb://'+mongo.hostname + ':' + mongo.port +  '/' + mongo.db,
    connect    : function(){
        mongoose.connect(this.connection,function(err,data){
            if(err){
                console.error('connect to mongodb failed:' + err.message);
            } else{
                console.log('successed to connect to mongodb:' + config.connection);
            }
        });
    }
};

module.exports = config;