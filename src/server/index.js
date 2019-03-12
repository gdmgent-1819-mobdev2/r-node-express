// Import the configuration: early as possible
import config from './config';

import http from 'http';
import https from 'https';
import express from 'express';

// Create the Express App
const app = express();

// Create an HTTP-server with Express injected
const httpServer = http.Server(app);

// Launch the HTTP-server
httpServer.listen(config.port, config.hostName, () => {
  console.log(`Node server running at http://${config.nodeHostname}:${config.nodePort}/!`)
});