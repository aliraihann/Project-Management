import {addTask, getAllTasks, updateProjectTask, deleteProjectTask, markTaskAsCompleted, getIncompleteTasks} from "../controllers/task.js";
import { Router } from "express";

const router = Router();

router.post('/projects/:projectId/tasks', addTask);
router.get('/projects/:projectId/tasks', getAllTasks);
router.put('/tasks/:id', updateProjectTask);
router.delete('/tasks/:id', deleteProjectTask);
router.post("/projects/:projectId/tasks/:taskId/mark-completed", markTaskAsCompleted);
router.get("/projects/:projectId/tasks/incomplete", getIncompleteTasks);

export default router;
