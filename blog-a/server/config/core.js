'use strict';

var fs = require('fs'),
    path = require('path'),
    qs = require('qs'),
    _ = require('underscore');

// recursively walk modules path and callback for each file
var walk = function(modulesPath, excludeDir, callback) {
    fs.readdirSync(modulesPath).forEach(function(file) {
        var newPath = path.join(modulesPath, file);
        var stat = fs.statSync(newPath);
        if (stat.isFile() && /(.*)\.(js|coffee)$/.test(file)) {
            callback(newPath);
        } else if (stat.isDirectory() && file !== excludeDir) {
            walk(newPath, excludeDir, callback);
        }
    });
};
exports.walk = walk;

//obj to params TODO: 换成qs
exports.stringify = function(obj) {
    /*var arr = [];
    for(var i in obj) {
        arr.push(i + '=' + obj[i]);
    }
    return arr.join('&');*/
    return qs.stringify(obj);
};

//包装项目路径
exports.translateAdminDir = function(p) {
    var newPath = ('blog' ? '/' + 'blog' : '') + (p || '');
    return newPath;
};

//包装项目路径
exports.translateAdminDirNew = function(p) {
    var newPath = ('#!' ? '/' + '#!' : '') + (p || '');
    return newPath;
};

//分页  params: 当前页, 总条数, 每页条数
exports.createPage = function(req, total, pageSize) {
    var pageSize = pageSize || 10;
    if (!req) {
        console.log('分页参数错误');
        return;
    }
    var query = req.query || {};
    var page = query.page | 0; //强制转化整型
    var totalPage = Math.max(Math.ceil(total / pageSize), 1); //获取总页数,容错
    var currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page; //获取当前页数
    var start = pageSize * (currentPage - 1); //计算开始位置
    return {
        start: start,
        pageSize: pageSize,
        totalPage: totalPage,
        currentPage: currentPage,
        query: query
    };
};

exports.getIp = function(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || req.ip;
};