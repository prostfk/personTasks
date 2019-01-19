const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const registrationRouter = require('./routes/registration');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/userRouter');
const app = express();
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

app.use(cors());
app.use(fileUpload());
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//URLS
app.use('/api/auth', authRouter);
app.use('/api/registration', registrationRouter);
app.use('/api/user', userRouter);
//URLS
app.use('/js', (req,resp)=>{
    resp.json({message: 'hello'});
});

// app.options('*', cors());

app.use((req, res, next) =>  {
  next(createError(404));
});



app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({'error': `something went wrong: ${err.message}`});
});

module.exports = app;
