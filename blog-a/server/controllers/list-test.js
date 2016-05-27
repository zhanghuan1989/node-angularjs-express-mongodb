'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    request = require('request'),
    core = require('../config/core');

exports.listTest = function(req, res,next) {
    console.info("hahahaha");
    var obj = [{"_id":"5742b77e53a49dd23880c9f1","name":"今天32","title":"天气很好","info":"适合休息"}];
    res.render('list-test',{  //页面的名称
        title:"哈哈",
        lists:obj
    });
    //next();
};

/**
 * 利用angular访问接口展示数据流程如下：
 * 首先页面中链接写的路由必须是angular中配置的路由，
 * 其次页面中data-ng-controller="xxController" data-ng-init="abc();"
 * 然后angular的xxController中，abc查询数据的方法$http的路径必须和express路由中的路径保持一致
 * express的对应路由方法查询成功后调用res.json()返回json数据到angular的$http的success中，赋值页面的$scope.listData = data;
 */
exports.getListTest2 = function(req, res,next) {
    var condition = {};
    var query = User.find(condition).populate('users');
    query.exec(function(err,results) {
        if(err){
            return res.render('error',{message:'User list error'});
        }
        else{
            res.json(results);
        }
    });
};
