import { Router } from 'express';
import path from 'path';


const __dirname = path.resolve();
const router = Router();
router.get('/', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'pages', 'user.html'));
});
router.get('/login', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'pages', 'login.html'));
});
router.get('/signup', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'pages', 'signup.html'));
});


export default router;
