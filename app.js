require('dotenv').config();
 
//  const CosmosClient = require('@azure/cosmos').CosmosClient
//  const config = require('./config')
//  const TaskList = require('./routes/tasklist')
//  const TaskDao = require('./models/taskDao')
 
 const indexRouter = require('./routes/index');
 const authRouter = require('./routes/auth');
 const userRouter = require('./routes/users');
//  const queueRouter = require('./routes/queue');
//  const notificationRouter = require('./routes/notification')
 
 const express = require('express')
 const path = require('path')
 const logger = require('morgan')
 const cookieParser = require('cookie-parser')
 const bodyParser = require('body-parser')
 var session = require('express-session');

 const app = express()
 
//  const { startPolling } = require('./utils/pollQueue');
//  startPolling();

 /**
 * Using express-session middleware for persistent user session. Be sure to
 * familiarize yourself with available options. Visit: https://www.npmjs.com/package/express-session
 */
 app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      secure: false, // set this to true on production
  }
}));

function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    res.redirect('/');
  }
}


 // view engine setup
 app.set('views', path.join(__dirname, 'views'))
 app.set('view engine', 'jade')
 

 // uncomment after placing your favicon in /public
 //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 app.use(logger('dev'))
 app.use(express.json()) // bodyparser
 app.use(express.urlencoded({ extended: false })) // bodyparser
 app.use(cookieParser())
 app.use(express.static(path.join(__dirname, 'public')))
 app.use('/', indexRouter);
 app.use('/auth', authRouter);
 app.use('/user', isAuthenticated, userRouter);

 app.set('view engine', 'jade')

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   const err = new Error('Not Found')
   err.status = 404
   next(err)
 })

 // error handler
 app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message
   res.locals.error = req.app.get('env') === 'development' ? err : {}

   // render the error page
   res.status(err.status || 500)
   res.render('error')
 })

 module.exports = app
