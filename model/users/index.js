/**
 * Created by RX-Wang on 2016/11/3.
 *
 *  UserModel
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    uname : String,
    pwd   : String,
    name  : String,
    role  : {type:String,default:'1'}
});

module.exports = mongoose.model('users',UserSchema);