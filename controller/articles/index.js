/**
 * Created by RX-Wang on 2016/11/2.
 */
var express = require('express');
var Articles = {};


/**
 * 文章详情
 * @param req
 * @param res
 * @returns {String}
 */
Articles.detail = function(req,res){
    var id = req.query.id || req.body.id || req.params.id || null;
    return res.render('articles',{data:id});
};


module.exports = Articles;