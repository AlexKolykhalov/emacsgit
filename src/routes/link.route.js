import { Router } from 'express';
import { linkController } from '../controllers/index.controller.js';


const router = Router();
router.get('/link', linkController.getAll);
router.put('/link/:id', linkController.update);
router.delete('/link/:id', linkController.remove);


export default router; 
