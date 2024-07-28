import express from 'express';
import { MainController } from '../controllers/index.js';


const router = express.Router();

router.get('/', MainController.index)

export default router;
