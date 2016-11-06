/**
 * Created by RX-Wang on 2016/11/3.
 *
 * ArticleTypeModel  文章类型
 */

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ArticleTypechema = new Schema({
    name  : String
});

module.exports = mongoose.model('articleType',ArticleTypechema);