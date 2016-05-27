var express = require('express');
var router = express.Router();
var core = require('../config/core');

var test = require('../controllers/list-test');

//路由名称和页面中/blog/list/test保持一致,也可用*通配符
router.route('/list/test').all(test.listTest);



module.exports = function(app) {

  app.post('/api/getListTest2',test.getListTest2);
  /*
  core.translateAdminDir('/')会增加一个blog和router.route('/list/test')，
   这个拼接起来，则和页面中配置的路径/blog/list/test保持一致啦
   */
  var path = core.translateAdminDir('/');
  app.use(path, router);
};

