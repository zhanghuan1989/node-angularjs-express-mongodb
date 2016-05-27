var express = require('express');
var router = express.Router();
var core = require('../config/core');

var index = require('../controllers/index');


module.exports = function(app) {
  //权限判断,判断是否登录
  //app.get("/",index.checkIsLogin);
  //app.route("/").get(index.checkIsLogin);

  app.route('/').get([index.checkIsLogin,index.index,index.list]);
  app.route('/list').get(index.list).post(index.create);
  //app.get('/list',index.list).post('/list',index.create);
  app.route('/list/:listId').get(index.read).put(index.update).delete(index.deleteByDetail).delete(index.delete);
  app.param('listId',index.findByID);
};
