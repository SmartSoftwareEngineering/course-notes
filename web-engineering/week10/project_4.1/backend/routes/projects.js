import { Router } from 'express';
import { getAll,
    create,
    getByID,
    updateByID,
    deleteByID
} from '../controllers/Project.js';


const projectRoutes = Router();

projectRoutes.get('/', getAll);
projectRoutes.post('/', create);
projectRoutes.get('/:id', getByID);
projectRoutes.put('/:id', updateByID);
projectRoutes.delete('/:id', deleteByID);

export default projectRoutes;