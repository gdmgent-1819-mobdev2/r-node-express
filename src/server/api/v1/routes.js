// Import the necessary libraries
import express from 'express';

import { nmdController } from './controllers'

// Define an express router
const apiV1Router = express.Router();

// Define the routes
apiV1Router.get('/nmd', nmdController.get_NMDQoute)

// Export the router
export default apiV1Router;