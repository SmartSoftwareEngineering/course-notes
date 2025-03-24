import { Router } from 'express';
import { signUp , logIn, getByID, updateByID, deleteByID } from '../controllers/User.js';


const userRoutes = Router();

userRoutes.post('/login', logIn);
userRoutes.post('/signup', signUp);
userRoutes.get('/:id', getByID);
userRoutes.put('/:id', updateByID);
userRoutes.delete('/:id', deleteByID);

export default userRoutes;