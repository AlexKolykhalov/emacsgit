// @ts-check

import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import 'dotenv/config';

import db from './database/models/index.js';
import router from './routes/index.route.js';
import { errorHandler } from './middlewares/index.middleware.js';


const __dirname = path.resolve();
const port = 3000;
const app = express();
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(errorHandler);
try {
    await db.sequelize.authenticate();
    app.listen(port, () => console.log(`Server has been started at port: ${port}...`));
} catch (error) {
    console.log(error);
}
