var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index'); // for one month aggregate
var usersRouter = require('./routes/users'); // for one year aggregate
var yearRouter = require('./routes/year'); // for 5 years aggregate
var lastRouter = require('./routes/last'); // retrieve last document inserted in a particular collection
var minRouter = require('./routes/min'); // The minimum and maximum close price of a collection over an year
var signupRouter = require('./routes/signup'); // sign up
var loginRouter = require('./routes/login'); // login

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//paths associated for each router

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/year',yearRouter);
app.use('/last',lastRouter);
app.use('/min',minRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
