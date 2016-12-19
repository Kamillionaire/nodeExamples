# Node.js and Express
(as of December 20th, 2016)

## So, what version of NODE.js do you have?

I assume are on node engine ~6.9.1 || <7.0.0

You can use:
* [N Version Manager](https://github.com/tj/n)
* [Node Version Manager](https://github.com/creationix/nvm)
* [NVMW for Windows](https://github.com/hakobera/nvmw)
* [Node.js one time install](https://nodejs.org/en/)

## Install Nodemon, a tool for monitoring node
`npm install -g nodemon`


## Using generated code
`npm i -g yo` then `npm i -g express-generator generator-codercamps-js`

*then*

`yo` and configure either

## From scratch project setup and installation

* `touch .env`
* `npm init`
* `bower init`
* `tsc --init`
* `npm i --save debug dotenv express path body-parser`
* `npm i --save @types/body-parser @types/debug @types/dotenv @types/express`

*edit your `package.json`*

```
"scripts": {
  "start": "nodemon ./bin/www",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

## Create the server

*create a file in project root called `app.ts` and import your dependencies*

```javascript
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
let app = express();
```

*add to `.env`*

```
A_SECRET_KEY=SHHHHHHHHH
```

*require the dotenv package to use development env vars*
```javascript
//for development env variables
if (app.get('env') === 'development') {
  let dotenv = require('dotenv');
  dotenv.load();
}

//uncomment to test a secret key
//console.log(process.env.A_SECRET_KEY);
```

*add static pathing. a way for your sever to serve the files in the folders*

```javascript
//pathing
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
```

*configure server by creating `bin/www.js`*

```javascript
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('myapp:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

*add a new api by creating `api/users.ts`*

```javascript
import * as express from 'express';
let router = express.Router();

router.get('/users', (req, res, next) => {
  res.json({
    message: 'Hello World'
  });
});

export = router;
```

*bootstrap your api to the app*
```javascript
//bootstrap /api
app.use('/api', require('./api/users'));
```

*add error handling and export your server*
```javascript
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
```

*testing*
Start your server by running `npm run`

Install postman
[https://www.getpostman.com/](https://www.getpostman.com/)

*create a get request to `localhost:3000/api/users`*

* you should see a message returned as `Hello World`

## Sum of process.argv numbers on NODE [LAB1](https://github.com/bamtron5/nodeExamples/blob/master/demo/1/lab1.js)

## LAB 2 Generate 100 products with different names, prices, and IDs

### Install packages
`npm i --save mongoose mongodb @types/mongoose @types/mongodb`

*add `./models/products.ts`*

```javascript
import * as mongoose from 'mongoose';

export interface IProducts extends mongoose.Document {
  name: string,
  price: number
}

let ProductSchema = new mongoose.Schema({
  name: String,
  price: Number
});

//sets to
ProductSchema.path('price').set(function(num) {
  return (num / 100).toFixed(2);
});

//Sets to 2 decimal on float
ProductSchema.path('price').get(function(num) {
  return (num).toFixed(2);
});

export default mongoose.model<IProducts>("Product", ProductSchema);
```

*create `./api/products`*

```javascript
import * as express from 'express';
import Product from '../models/products';
let router = express.Router();
import * as mongoose from 'mongoose';

router.post('/products', (req, res, next) => {
  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  product.save().then((p) => {
    res.json(p);
  }).catch((e) => {
    res.status(500).json({message: e});
  })
});

export = router;
```
