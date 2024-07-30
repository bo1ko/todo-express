import { body } from 'express-validator';

export const taskCreateValidation = [
    body('title', 'Enter the name of the task!').isLength({ min: 3 }),
    body('description', 'Enter task description!').isLength({ min: 3 }),
];

export const taskUpdateValidation = [
    body('title', 'Enter the name of the task!').optional().isLength({ min: 3 }),
];
