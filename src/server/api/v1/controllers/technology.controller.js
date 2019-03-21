import uuidv4 from 'uuid/v4';
import * as mockTechnologies from '../mocks/technologies';

let technologies = mockTechnologies;

class TechnologyController {
    constructor() {
    }

    // List all the models
    index = (req, res, next) => {
        return res.json(technologies);
    }

    // Show a specific model
    show = (req, res, next) => {
        const id = req.params.id;
        const item = technologies.find((obj) => {
            return obj.id = id;
        });
        return res.json(item);
    }

    // ViewModel for Insert / Create
    create = (req, res, next) => {
        
        const item = technologies.find((obj) => {
            return obj.name = id;
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
        technologies = technologies.filter(item => item.id !== id);
        return res.json({ 'message': 'ok '});
    }
}

export default TechnologyController;