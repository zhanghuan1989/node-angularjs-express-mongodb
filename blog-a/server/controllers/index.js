'use strict';
var mongoose = require('mongoose'),
    List = mongoose.model('List'),
    request = require('request'),
    core = require('../config/core');

//此模块并发node.js 原生自带模块,首先需要 npm install request
//var postData = {"provinceId": "4028809b31ccbb530131ccbcfccc03e9"};
//var reqUrl = "http://10.20.101.115:8080/mobileInterface/service/houserent/cityList";

var postData = {uname:"15078381887",village_num:"0003006",page:"1"};
var reqUrl = "http://10.20.101.115/appInterface.php?m=sns&s=myCollectGoods&version=3.0";

var options = {
    headers: {"Connection": "close"},
    url: reqUrl,
    method: 'POST',
    json:true,
    body: postData
};

function callback(error, response, data) {
    if (!error && response.statusCode == 200) {
        //console.log(data);
    }
}

request(options, callback);

//错误处理函数
var getErrorMessage = function(err){
    if(err.errors){
        for(var errName in err.errors){
            if(err.errors[errName].message) return err.error[errName].message;
        }
    }else{
        return 'Unknown server error';
    }
}

//权限判断,判断是否登录
exports.checkIsLogin = function(req, res,next) {
    if(!req.session.user) {
        var path = core.translateAdminDir('/user/login');
        return res.redirect(path);
    }
    next();
};

exports.index = function(req, res) {
    res.render('',{
        title:"哈哈",
        pageInfo:{}
    });
};

//添加
exports.create = function(req, res) {
    var list = new List(req.body);
    list.save(function(err) {
        if(err){
            return res.status(400).send({message:getErrorMessage(err)});
        }
        else{
            res.json(list);
        }
    });
};


//通过id查找单个
exports.findByID = function(req, res,next,listId) {
    List.findById(listId).populate('lists').exec(function(err, result) {
        if(err) return next(err);
        if(!result) return next(new Error('Failed to load list ' + listId));
        req.list = result;
        next();
    });
};

exports.read = function(req, res) {
    res.json(req.list);
};


//查询首页列表数据
exports.list = function(req, res) {
    var condition = {};
    List.count(condition, function(err, total) {
        var query = List.find(condition).populate('lists');
        //分页
        /*var pageInfo = core.createPage(req, total, 10);
        query.skip(pageInfo.start);
        query.limit(pageInfo.pageSize);
        query.sort({created: -1});
        console.info(pageInfo);*/

        query.exec(function(err,results) {
            if(err){
                return res.status(400).send({message:getErrorMessage(err)});
            }
            else{
                //console.info(results);
                res.json(results);
            }
        });
    });
}

//编辑
exports.update = function(req, res) {
    var list = req.list;
    list.name = req.body.name;
    list.title = req.body.title;
    list.info = req.body.info;

    list.save(function(err){
        if(err){
            return res.status(400).send({message:getErrorMessage(err)});
        }
        else{
            res.json(list);
        }
    });
};

//在详情中删除
exports.deleteByDetail = function(req, res) {
    var list = req.list;
    list.remove(function(err){
        if(err){
            return res.status(400).send({message:getErrorMessage(err)});
        }
        else{
            res.json(list);
        }
    });
}

//在列表中删除
exports.delete = function(req, res) {
    var list = req.list;
    list.remove(function(err){
        if(err){
            return res.status(400).send({message:getErrorMessage(err)});
        }
        else{
            res.json(list);
        }
    });
}

//实现身份验证中间件
exports.requiresLogin = function(req,res,next){
    if(!req.isAuthenticated()){
        return res.status(401).send({
            message:'User is not logged in'
        })
    }
    next();
}

//实现授权中间件
exports.hasAuthorization = function(req,res,next){
    if(!req.list.id !== req.user.id){
        return res.status(403).send({
            message:'User is not authorized'
        })
    }
    next();
}