// Import the necessary libraries
import express from 'express';

import { PostController } from './controllers';

// Make instances of the controllers
const postController = new PostController();

// Define an express router
const apiV1Router = express.Router();

// Define the routes
apiV1Router.get('/posts', postController.index)
apiV1Router.get('/posts/:id', postController.show)
apiV1Router.get('/posts/create', postController.create)
apiV1Router.post('/posts', postController.store)
apiV1Router.get('/posts/:id/edit', postController.edit)
apiV1Router.put('/posts/:id', postController.update)
apiV1Router.delete('/posts/:id', postController.destroy)

// Export the router
export default apiV1Router;