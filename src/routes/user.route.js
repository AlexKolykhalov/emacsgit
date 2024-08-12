import { Router } from 'express';
import { userController } from '../controllers/index.controller.js';


const router = Router();
router.get('/:id', userController.get);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);


export default router; 
