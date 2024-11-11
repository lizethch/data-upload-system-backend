import express from "express";
import dotenv from 'dotenv';
import authRouter from './routers/authRouter';
import uploadRouter from './routers/uploadRouter';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/', authRouter);
app.use('/upload', uploadRouter);

app.listen(process.env['SERVER_PORT'], () => console.log(`Escuchando al puerto ${process.env['SERVER_PORT']}`));