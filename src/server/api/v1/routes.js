// Import the necessary libraries
import express from 'express';

import { TechnologyController } from './controllers';

// Make instances of the controllers
const technologyController = new TechnologyController();

// Define an express router
const apiV1Router = express.Router();

// Define the routes
apiV1Router.get('/technologies', technologyController.index)
apiV1Router.get('/technologies/:id', technologyController.show)
apiV1Router.get('/technologies/create', technologyController.create)
apiV1Router.post('/technologies', technologyController.store)
apiV1Router.get('/technologies/:id/edit', technologyController.edit)
apiV1Router.put('/technologies/:id', technologyController.update)
apiV1Router.delete('/technologies/:id', technologyController.destroy)

// Export the router
export default apiV1Router;