'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Role = mongoose.model('Role'),
    _ = require('underscore'),
    core = require('../config/core');

//注册
exports.register = function(req, res) {
    var method = req.method;
    if (method === 'GET') {
        res.render('register', {title: '注册'});
    } else if (method === 'POST') {
        var obj = req.body;
        console.log(obj);
        var users = new User(obj);

        User.findOne({
            name: obj.name
        }).populate('users').exec(function(err, user) {
            if (user) {
                return res.render('error', {
                    message: '注册失败, 该用户已存在',
                    title: '错误'
                });
            }
            users.save(function(err, result) {
                console.log(result);
                if (err) {
                    console.log(err);
                    var errors = err.errors;
                    var message = [];
                    for (var i in errors) {
                        message.push(errors[i].message);
                    }
                    return res.render('error', {
                        message: '注册失败' + message.join('<br/>'),
                        title: '注册'
                    });
                }
                /* res.render('', {
                 message: '注册成功',
                 title: '注册',
                 result: result
                 });*/
                var path = core.translateAdminDir('/user/login');
                res.redirect(path);
            });
        });


    }
};

//登录
exports.login = function(req, res) {
    if (req.method === 'GET') {
        //req.session.loginReferer = req.headers.referer;
        res.render('login', {title: '登录'});
    } else if (req.method === 'POST') {
        var username = req.body.name;
        var password = req.body.password;
        User.findOne({
            name: username
        }).populate('users').exec(function(err, user) {
            if (!user) {
                return res.render('error', {
                    message: '登录失败, 查无此人',
                    title: '错误'
                });
            }
           // if (user.authenticate(password)) {
                console.log('登录成功---');

                //记录登录信息
                user.last_login_date = new Date();
                user.last_login_ip = core.getIp(req);
                user.save();
                req.user = user;
                req.session.user = user;
                var path = core.translateAdminDirNew('/');
                res.redirect(path);
        });
    }

};

//退出登录
exports.loginout = function(req, res) {
    req.session.user = null;
    var path = core.translateAdminDirNew('/');
    res.redirect(path);

};