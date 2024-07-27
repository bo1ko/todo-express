import { body } from 'express-validator';

export const taskCreateValidation = [
    body('title', 'Enter the name of the article!').isLength({ min: 3 }),
];

export const taskUpdateValidation = [
    body('title', 'Enter the name of the article!').optional().isLength({ min: 3 }),
];

export const registerValidation = [
    body('name', 'Enter a name').isLength({ min: 3 }),
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'The password must be at least 5 characters long').isLength({ min: 5 }),
]


export const loginValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'The password must be at least 5 characters long').isLength({ min: 5 }),
]

