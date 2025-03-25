import userRoutes from "./users.js";
import { Router } from 'express';

const allRoutes = Router();

allRoutes.use('/user', userRoutes);

export default allRoutes;