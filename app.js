var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var session = require('express-session')
var mongoose = require('mongoose')
var MongoStore = require("connect-mongo")(session)
require('dotenv').config()

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect(process.env.db, {
     useNewUrlParser: true,
      useUnifiedTopology: true
   })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


app.use(session({
   secret: "basic-auth-secret",
   cookie: { maxAge: 600000 },
   store: new MongoStore({
     mongooseConnection: mongoose.connection,
     ttl: 24 * 60 * 60 // 1 day
   })
 }));


 function auth(req,res,next){
  if (req.session.currentUser){
    res.locals.user = req.session.currentUser;
    next()
  } else {
    res.json({message:'Please log in to access this page'})
  }
}


app.use('/', indexRouter);
app.use('/cars', require('./routes/cars'))

app.use('/user', auth, require('./routes/user'))
app.use('/auth', require('./routes/auth'))


module.exports = app;
