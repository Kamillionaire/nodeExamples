import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';
let app = express();

//for development env variables
if (app.get('env') === 'development') {
  let dotenv = require('dotenv');
  dotenv.load();
}

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('mongoose connected');
});

mongoose.connection.on('error', (e) => {
  console.log('mongoose error', e);
  process.exit();
});

//console.log(process.env.A_SECRET_KEY);

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//pathing
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));

//bootstrap /api
app.use('/api', require('./api/users'));
app.use('/api', require('./api/products'));

//seed script for products
if(app.get('env') === 'development') {
  require('./seeds/products');
}

// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: Error, req, res, next) => {

    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// TODO Error interface
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
