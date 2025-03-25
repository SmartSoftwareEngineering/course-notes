import taskRoutes from "./tasks.js";
import projectRoutes from "./projects.js";
import userRoutes from "./users.js";
import { Router } from 'express';

const allRoutes = Router();

allRoutes.use('/user', userRoutes);
allRoutes.use('/project', projectRoutes);
allRoutes.use('/task', taskRoutes);

export default allRoutes;