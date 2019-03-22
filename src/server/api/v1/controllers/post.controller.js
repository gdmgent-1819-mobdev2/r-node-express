import uuidv4 from 'uuid/v4';
import { handleAPIError } from '../utilities/errorHandler';
import * as mockPosts from '../mocks/posts';

let posts = mockPosts.posts;

class PostController {
    constructor() {
    }

    // List all the models
    index = (req, res, next) => {
        if(posts === undefined || posts === null) {
            handleAPIError(404, `Posts are not defined!`, next)
        }
        return res.json(posts);
    }

    // Show a specific model
    show = (req, res, next) => {
        const id = req.params.id;
        const item = posts.find((obj) => {
            return obj.id == id;
        });
        if(item === undefined) {
            handleAPIError(404, `Post with id: ${id} not found!`, next)
        }
        return res.json(item);
    }

    // ViewModel for Insert / Create
    create = (req, res, next) => {
        
        const item = posts.find((obj) => {
            return obj.name == id;
        });
        throw new Error('Not implemented yet!');
    }

    // Store / Create the noew model
    store = (req, res, next) => {        
        let post = req.body;
        post.id = uuidv4();
        return res.json(post);
    }

    // ViewModel for Edit / Update
    edit = (req, res, next) => {
        const id = req.params.id;
        throw new Error('Not implemented yet!');
    }

    // Update the model
    update = (req, res, next) => {  
        const id = req.params.id;      
        let post = req.body;
        return res.json(post);
    }

    // Delete / Destroy the model
    destroy = (req, res, next) => {  
        const id = req.params.id;      
        posts = posts.filter(item => item.id !== id);
        return res.json({ 'message': 'ok '});
    }
}

export default PostController;