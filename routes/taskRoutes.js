import express from 'express';

import { TaskController } from '../controllers/index.js';
import { taskCreateValidation, taskUpdateValidation } from "../validation.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";


const router = express.Router();


router.get('/', TaskController.getAllTasks);
router.post('/', taskCreateValidation, handleValidationErrors, TaskController.createTask);
router.delete('/:id', TaskController.deleteTask);

router.get('/:id', TaskController.getTaskById);

router.patch('/:id', taskUpdateValidation, handleValidationErrors, TaskController.updateTask);



export default router;
