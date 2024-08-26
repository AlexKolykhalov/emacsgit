// @ts-check

import { Router } from 'express';

import { authController } from '../controllers/index.controller.js';
import { authValidation } from '../middlewares/index.middleware.js';


const router = Router();
router.post('/login', authValidation, authController.login);
router.post('/signup', authValidation, authController.signup);
router.get('/refresh', authController.refresh);
router.get('/logout', authController.logout);


export default router; 
