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
Cors
*/
import cors from 'cors';

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

// Import the router from api/v1
import apiV1Router from './api/v1/routes'

// Create the Express App
const app = express();
// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'views'));
// Set the view engine to ejs
app.set('view engine', 'ejs')
// Static resources (CSS, JavaScript, Icons, Images, ...). Serve it in virtual directory static
app.use('/static', express.static(path.join(__dirname, 'assets')))
// Use morgan only for development
app.use(morgan('combined'));
// Cors Options
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
// Load body parser for parsing JSON in requests
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', keepExtensions: true }));

// Use the router from api/v1
app.use('/api/v1', apiV1Router)

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