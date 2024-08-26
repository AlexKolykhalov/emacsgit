import { Router } from 'express'
import path from 'path';

import pagesRouter from '../routes/pages.route.js';
import authRouter from '../routes/auth.route.js';
import userRouter from '../routes/user.route.js';
import linkRouter from '../routes/link.route.js';


const __dirname = path.resolve();
const router = Router();
router.use(pagesRouter);
router.use(authRouter);
router.use('/user', userRouter);
router.use(linkRouter);
router.use((_, res)=>{
    res.status(404).sendFile(path.resolve(__dirname, 'public', '404.html'));
});


export default router;
