import { Router } from 'express';
import { getAll,
    create,
    getByID,
    updateByID,
    deleteByID
} from '../controllers/Task.js';


const taskRoutes = Router();

taskRoutes.get('/', getAll);
taskRoutes.post('/', create);
taskRoutes.get('/:id', getByID);
taskRoutes.put('/:id', updateByID);
taskRoutes.delete('/:id', deleteByID);

export default taskRoutes;