import { newProject, projectList, projectById, projectUpdate, deleteProject } from "../controllers/project.js";
import { Router } from "express";

const router = Router();

router.post('/projects', newProject);
router.get('/projects', projectList);
router.get('/projects/:id', projectById);
router.put('/projects/:id', projectUpdate);
router.delete('/projects/:id', deleteProject);

export default router;