import express from 'express';
import { MainController } from '../controllers/index.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const router = express.Router();

router.get('/', checkAuth, handleValidationErrors, MainController.index)

export default router;
