import express from 'express';

import { UserController } from '../controllers/index.js';
import { registerValidation, loginValidation } from "../validation.js";
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const router = express.Router();

router.get('/register', UserController.getRegister);
router.post('/register', registerValidation, handleValidationErrors, UserController.postRegister);
router.get('/login', UserController.getLogin);
router.post('/login', loginValidation, handleValidationErrors, UserController.postLogin);
router.get('/me', checkAuth, handleValidationErrors, UserController.getMe);

export default router;