// Import the configuration: early as possible
import config from './config';

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

// Import the router from api/v1
import apiV1Router from './api/v1/routes'

// Create the Express App
const app = express();
// Load body parser for parsing JSON in requests
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', keepExtensions: true }));

// Use the router from api/v1
app.use('/api/v1', apiV1Router)

// Create an HTTP-server with Express injected
const httpServer = http.Server(app);

// Launch the HTTP-server
httpServer.listen(config.nodePort, config.nodeHostname, () => {
  console.log(`Node server running at http://${config.nodeHostname}:${config.nodePort}/!`)
});