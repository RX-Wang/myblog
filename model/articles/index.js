/**
 * Created by RX-Wang on 2016/11/3.
 *
 * ArticlesModel
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ArticlesSchema = new Schema({
    title       : String,   //标题
    intro       : String,   //简介
    type        : String,   // 类型
    content     : String,   //内容
    authorID    : String,   //作者ID
    createDate  : Date,     //创建时间
    deleteDate  : Date      //删除时间
});

module.exports = mongoose.model('articles',ArticlesSchema);