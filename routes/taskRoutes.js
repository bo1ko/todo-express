import express from 'express';

import { TaskController } from '../controllers/index.js';
import { taskCreateValidation, taskUpdateValidation } from "../validation.js";
import { handleValidationErrors, checkAuth } from "../utils/index.js";


const router = express.Router();


router.post('/', checkAuth, taskCreateValidation, handleValidationErrors, TaskController.createTask);
router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.put('/:id', checkAuth, taskUpdateValidation, handleValidationErrors, TaskController.updateTask);
router.delete('/:id', checkAuth, handleValidationErrors, TaskController.deleteTask)


export default router;
