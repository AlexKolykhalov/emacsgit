import Router from 'express';
import { create, get, update, remove } from '../controllers/api.js';


const router = Router();
router.post('/api/key', create);
router.get('/api/keys', get);
router.put('/api/key/:id', update);
router.delete('/api/key/:id', remove);


export default router; 
