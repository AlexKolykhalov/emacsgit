import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));

app.listen(port, () => {
    console.log(`Server has been started at port: ${port}...`);
});
