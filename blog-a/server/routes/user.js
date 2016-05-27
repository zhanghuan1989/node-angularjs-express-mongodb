var express = require('express');
var router = express.Router();
var core = require('../config/core');

var user = require('../controllers/user');

//登录
router.route('/login').all(user.login);
//注册
router.route('/register').all(user.register);
//退出登录
router.route('/loginout').get(user.loginout);

module.exports = function(app) {
  var path = core.translateAdminDir('/user');
  app.use(path, router);
};

