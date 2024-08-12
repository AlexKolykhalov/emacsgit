import { Router } from 'express'
import authRouter from '../routes/auth.route.js';
import userRouter from '../routes/user.route.js';
import linkRouter from '../routes/link.route.js';


const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(linkRouter);


export default router;
