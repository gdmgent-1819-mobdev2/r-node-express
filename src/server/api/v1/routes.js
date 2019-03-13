// Import the necessary libraries
import express from 'express';

import { NMDController } from './controllers';

// Make instances of the controllers
const nmdController = new NMDController();

// Define an express router
const apiV1Router = express.Router();

// Define the routes
apiV1Router.get('/nmd', nmdController.index)
apiV1Router.get('/nmd/:id', nmdController.show)
apiV1Router.get('/nmd/create', nmdController.create)
apiV1Router.post('/nmd', nmdController.store)
apiV1Router.get('/nmd/:id/edit', nmdController.edit)
apiV1Router.put('/nmd/:id', nmdController.update)
apiV1Router.delete('/nmd/:id', nmdController.destroy)

// Export the router
export default apiV1Router;