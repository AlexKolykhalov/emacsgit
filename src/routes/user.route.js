import { Router } from 'express';

import { userController } from '../controllers/index.controller.js';
import { tokenValidation, userValidation } from '../middlewares/index.middleware.js';


const router = Router();
router.get('/', tokenValidation, userController.get);
router.put('/', tokenValidation, userValidation, userController.update);
router.delete('/', tokenValidation, userController.remove);


export default router;  
