// Import the configuration: early as possible
import config from './config';

import path from 'path';

import http from 'http';
import https from 'https';
/*
Fast, unopinionated, minimalist web framework for node.
https://www.npmjs.com/package/express
*/
import express from 'express';

/*
Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
https://www.npmjs.com/package/body-parser
*/
import bodyParser from 'body-parser';

/*
HTTP request logger middleware for node.js
https://www.npmjs.com/package/morgan
https://github.com/expressjs/morgan
*/
import morgan from 'morgan';
import chalk from 'chalk';

import mongoose from 'mongoose';

// Import the router from api/v1
import apiV1Router from './api/v1/routes'

/*
Mongoose (MongoDb-port)
*/
const mongoDbConnectionString = config.mongoDbConnection;
mongoose.connect(mongoDbConnectionString, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb Connection error!'));
db.on('open', console.log.bind(console, 'MongoDb Connected!'));

/*
Morgan Middleware
*/
const morganMiddleware = morgan(function (tokens, req, res) {
  return [
      '\n',
      chalk.hex('#ff4757').bold('🍄  Morgan --> '),
      chalk.hex('#34ace0').bold(tokens.method(req, res)),
      chalk.hex('#ffb142').bold(tokens.status(req, res)),
      chalk.hex('#ff5252').bold(tokens.url(req, res)),
      chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
      chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
      chalk.yellow(tokens['remote-addr'](req, res)),
      chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
      chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
      '',
  ].join(' ');
});

// Create the Express App
const app = express();
// Use morgan middelware
app.use(morganMiddleware);
// Set the default views directory to views folder
app.set('views', path.join(__dirname, 'views'));
// Set the view engine to ejs
app.set('view engine', 'ejs')
// Set the assets folder as static
app.use('/static', express.static(path.join(__dirname, 'assets')));
// Load body parser for parsing JSON in requests
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', keepExtensions: true }));

// Use the router from api/v1
app.use('/api/v1', apiV1Router);

// Last route is 404
app.use((req, res, next) => {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Application Error Handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  const obj = {
    error: {
      message: error.message,
      status: error.status,
      timestamp: new Date().getTime()
    }
  }

  if(req.xhr){
    res.json(obj);
  } else {
    if(error.status === 404) {
      res.render('404', obj) 
    } else {
      res.render('error', obj)
    }
  }

});

// Create an HTTP-server with Express injected
const httpServer = http.Server(app);

// Launch the HTTP-server
httpServer.listen(config.nodePort, config.nodeHostname, () => {
  console.log(`Node server running at http://${config.nodeHostname}:${config.nodePort}/!`)
});