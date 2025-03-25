import { Router } from 'express';
import { signUp , logIn } from '../controllers/User.js';


const userRoutes = Router();

userRoutes.post('/login', logIn);
userRoutes.post('/signup', signUp);

export default userRoutes;