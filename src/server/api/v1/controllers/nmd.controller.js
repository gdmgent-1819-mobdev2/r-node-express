import uuidv4 from 'uuid/v4';

let technologies = [
    { 'id': 'af2a49f9-0657-4612-b483-89d79f321638', 'name': 'HTML' },
    { 'id': 'a828ae83-481b-47b5-a941-02da0c53bd6a', 'name': 'CSS' },
    { 'id': 'ae642859-830c-4656-9544-b4de475887fd', 'name': 'JavaScript' }
];

class NMDController {
    constructor() {

    }

    index = (req, res, next) => {
        return res.json(technologies);
    }

    show = (req, res, next) => {
        const id = req.params.id;
        const item = technologies.find((obj) => {
            return obj.id = id;
        });
        return res.json(item);
    }

    // ViewModel for Insert / Create
    create = (req, res, next) => {
        throw new Error('Not implemented yet!');
    }

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

    update = (req, res, next) => {  
        const id = req.params.id;      
        let post = req.body;
        return res.json(post);
    }

    destroy = (req, res, next) => {  
        const id = req.params.id;      
        technologies = technologies.filter(item => item.id !== id);
        return res.json({ 'message': 'ok '});
    }
}

export default NMDController;