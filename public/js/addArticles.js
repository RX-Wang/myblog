/**
 * Created by RX-Wang on 2016/11/6.
 */
/**
 * 保存文章
 * @param e
 */

jQuery(function ($) {
    //如果选择了某个类型，把输入的类型清空
    $('#typeSelect').change(function(){
        $('#typeInput').val('');
    });
    //如果输入了类型，把选择的清空
    $('#typeInput').blur(function(){
        $('#typeSelect').val('');
    });
});
var saveArticle = function(e){
    var title       = $('#title').val();        //标题
    var intro       = $('#intro').val();        //简介
    var typeSelect  = $('#typeSelect').val();   //选择的类型
    var typeInput   = $('#typeInput').val();    //输入的类型
    var content     = $('#content').html();      //文章内容

    if(!title){
        $('#title').focus();
    }else if(!intro){
        $('#intro').focus();
    }else if(!typeSelect && !typeInput){
        alert('请选择或输入文章类型');
    }else if(!content){
        $('#content').focus();
    }

    $.ajax({
        url      : '/articles/addArticle',
        type     : 'POST',
        dataType : 'JSON',
        data : {
            title       : title,
            intro       : intro,
            type        : typeSelect || typeInput,
            content     : content,
            typeSelect  : typeSelect,
            typeInput   : typeInput
        },
        success : function(data){
            if(data && data.code == 200){
                window.location.href = '/';
            }else{
                alert(data.msg);
            }
        },
        error   : function(){
            alert('添加失败');
        }
    });
};