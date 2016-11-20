var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config   = require('./config').connect();
var routes   = require('./routes');
var users    = require('./routes/users');
var articles = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 配置  session 内存存储
 */
app.use(session(
    {
        secret: 'myblog',
        key: 'cookieName',            //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: {maxAge: 1000 * 60 * 30 },   //设置maxAge是30m，即30m后session和相应的cookie失效过期
        //cookie: {maxAge: 4000 },   //设置maxAge是30m，即30m后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: true
    }
));
app.use(function(req,res,next){
    res.locals.c_user = req.session.user;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);

app.use(function(req,res,next){
    res.locals.c_user = req.session.user;
    next();
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

console.log('listening on 3001' );
module.exports = app;
