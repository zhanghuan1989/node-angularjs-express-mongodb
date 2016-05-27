var express = require('express');
var mongoose = require('mongoose'); //数据存储，连接数据库，mongodb
var path = require('path'); //项目路径
var favicon = require('serve-favicon'); //收藏头像
var logger = require('morgan'); //记录http请求日志
var cookieParser = require('cookie-parser'); //解析cookie，并将结果组装req.cookie对象
var session = require('express-session');
var RedisStore = require('connect-redis')(session); //存储session,防止服务重启后session丢失
var bodyParser = require('body-parser'); //对请求的body进行解析，支持多种http请求类型

var core = require('./server/config/core');
var appPath = process.cwd(); //当前进程路径
var config = require('./server/config/config');

var app = express();

// view engine setup 设置页面模板
app.set('views', path.join(__dirname, 'server/views')); //设置视图文件的存储目录
app.set('view engine', 'ejs'); //设置ejs作为express应用的模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //设置静态文件访问路径，当前public
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'server/views')));

//使用session
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'ruoguan'
  /*,
   store: new RedisStore*/
}));

//连接数据库，数据库毗连设置
mongoose.connect(config.mongodb.uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('mongodb连接成功');
});

//载入数据模型
core.walk(appPath + '/server/models', null, function(path) {
  require(path);
});

//session中间件，此处定义的是用户相关信息,必须放在router路由定义之前
app.use(function(req, res, next) {
  res.header('X-Powered-By', 'wengqianshan');
  res.locals.token = req.csrfToken && req.csrfToken();
  if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null;
  }
  next();
});

//路由控制
core.walk(appPath + '/server/routes', 'middlewares', function(path) {
  require(path)(app);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//logErrors 将请求和错误信息写入标准错误输出、日志或类似服务：
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

//clientErrorHandler 的定义如下（注意这里将错误直接传给了 next）：
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}
//errorHandler 能捕获所有错误，其定义如下：
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

var debug = require('debug')('blog');
//创建server服务，并监听端口然后回调
//设置端口，node提供process指当前进程对象
app.set('port', process.env.PORT || config.port || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('网站服务已启动，端口号： ' + server.address().port);
});