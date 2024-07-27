import express from 'express';

import { UserController } from '../controllers/index.js';
import { registerValidation, loginValidation } from "../validation.js";
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const router = express.Router();

router.post('/register', registerValidation, handleValidationErrors, UserController.register);
router.post('/login', loginValidation, handleValidationErrors, UserController.login);
router.get('/me', checkAuth, handleValidationErrors, UserController.getMe);

export default router;