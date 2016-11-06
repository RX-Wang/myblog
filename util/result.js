/**
 * Created by RX-Wang on 2016/11/3.
 */

var result = {};
result.success = function (data,res) {
    data.code = 200;
    res.json(data);
};
result.failse = function(code,data,res){
    data.code = code;
    res.json(data);
};
module.exports = result;